import test from "node:test";
import assert from "node:assert/strict";
import {createGame,playTurn,eventFor,debrief,optionList,START} from "../game-engine.js";

test("crew selection requires exactly two unique specialists",()=>{
  assert.throws(()=>createGame(["doctor","doctor"],1));
  assert.throws(()=>createGame(["doctor"],1));
  assert.deepEqual(createGame(["doctor","engineer"],1).resources,START);
});
test("six-turn simulation terminates and resources remain bounded",()=>{
  for(let seed=0;seed<100;seed++){
    let s=createGame(["doctor","engineer"],seed);
    while(!s.finished){s=playTurn(s,optionList(s).find(o=>o.id==="safe")?.id??optionList(s)[0].id);}
    assert.ok(s.log.length<=6);
    assert.equal(s.log.length,s.turn);
    for(const val of Object.values(s.resources))assert.ok(val>=0&&val<=10);
    assert.ok(debrief(s).score>=0&&debrief(s).score<=1000);
  }
});
test("Doctor prevents routine fatigue on turns 3 and 5",()=>{
  let a=createGame(["doctor","engineer"],42);
  let b=createGame(["scientist","engineer"],42);
  for(let n=1;n<=3;n++){a=playTurn(a,"safe");b=playTurn(b,"safe");}
  assert.equal(a.resources.crew,b.resources.crew+1);
});
test("same seed and same choices reproduce the result",()=>{
  const run=()=>{let s=createGame(["field","scientist"],12);while(!s.finished)s=playTurn(s,optionList(s)[0].id);return s;};
  assert.deepEqual(run(),run());
});
test("decision scores are independent of the random risk roll",()=>{
  const r1=playTurn(createGame(["engineer","doctor"],1),"risk");
  const r2=playTurn(createGame(["engineer","doctor"],999),"risk");
  assert.equal(r1.log[0].points,r2.log[0].points);
});
test("investment is delayed by two turns",()=>{
  let s=createGame(["engineer","doctor"],10);
  s=playTurn(s,"invest");
  assert.equal(s.pending[0].turn,3);
  s=playTurn(s,"safe");
  assert.equal(s.pending.length,1);
  s=playTurn(s,"safe");
  assert.equal(s.pending.length,0);
});
test("mission events progress in intended order",()=>{
  let s=createGame(["engineer","doctor"],77);
  assert.equal(eventFor(s).id,"abundance");
  s=playTurn(s,"safe");
  assert.equal(eventFor(s).id,"solar");
});
test("invalid actions are rejected",()=>assert.throws(()=>playTurn(createGame(["doctor","engineer"],1),"teleport")));

test("turn 1 temptation is certain and rated Poor",()=>{
 let x=playTurn(createGame(["doctor","engineer"],1),"risk");
 assert.equal(x.log[0].points,0);
 assert.equal(x.log[0].rating,"Poor");
 assert.equal(x.resources.power,4); // 6 - 3 + 1 daylight
 assert.equal(x.resources.crew,10); // +1 temptation, -1 fatigue, capped at 10
});
test("turn five presents only two specialist-based choices",()=>{
 let s=createGame(["doctor","engineer"],2);
 for(let i=0;i<4 && !s.finished;i++)s=playTurn(s,"safe");
 assert.equal(s.turn,5);
 assert.deepEqual(optionList(s).map(o=>o.id),["go","hold"]);
 let next=playTurn(s,"go");
 assert.ok([0,75,150].includes(next.log.at(-1).points));
});
test("final choices use v2 costs",()=>{
 let s=createGame(["doctor","engineer"],1);
 for(let i=0;i<5&&!s.finished;i++)s=playTurn(s,optionList(s).find(o=>o.id==="safe")?.id??optionList(s)[0].id);
 if(!s.finished){
  const a=playTurn(s,"shutdown");
  assert.equal(a.finished,true);
  assert.ok(a.log.at(-1).points===0||a.log.at(-1).points===250);
  assert.equal(a.log.at(-1).after.crew,Math.max(0,s.resources.crew-3)); // -1 routine, -2 final
 }
});
test("all poor decisions are listed in debrief",()=>{
 let s=createGame(["doctor","engineer"],1);
 s=playTurn(s,"risk");
 while(!s.finished)s=playTurn(s,optionList(s)[0].id);
 const d=debrief(s);
 assert.equal(d.poor.length,s.log.filter(x=>x.rating==="Poor").length);
 assert.ok(d.poor.some(x=>x.turn===1));
});
test("all five turn-four event cards can be selected",()=>{
 const ids=new Set();
 for(let seed=0;seed<100;seed++){
  let s=createGame(["doctor","engineer"],seed);
  for(let i=0;i<3&&!s.finished;i++)s=playTurn(s,"safe");
  if(!s.finished) ids.add(eventFor(s).id);
 }
 assert.deepEqual([...ids].sort(),["battery","cable","computer","dust","water"]);
});

test("negative power after night drain triggers oxygen and water penalties and clamps",()=>{
 const before=createGame(["doctor","engineer"],101);
 const s={...before,turn:4,resources:{...before.resources,power:1,water:6,oxygen:6,crew:8}};
 const result=playTurn(s,"safe");
 assert.equal(result.resources.power,0);
 assert.equal(result.resources.oxygen,3); // night -1 plus no power -2
 assert.equal(result.resources.water,4); // night -1 plus no power -1
 assert.ok(Object.values(result.resources).every(x=>x>=0&&x<=10));
});
test("negative oxygen produces crew loss and immediate mission termination",()=>{
 const before=createGame(["doctor","engineer"],102);
 const s={...before,turn:4,resources:{...before.resources,crew:4,oxygen:0,water:6,power:5}};
 const result=playTurn(s,"safe");
 assert.equal(result.finished,true);
 assert.equal(result.win,false);
 assert.equal(result.resources.crew,0);
 assert.equal(result.resources.oxygen,0);
 assert.equal(result.log.at(-1).after.crew,0);
});
test("all resource paths clamp for extreme low states",()=>{
 const base=createGame(["doctor","engineer"],103);
 const s={...base,turn:5,resources:{crew:2,base:0,parts:0,power:0,water:0,oxygen:0}};
 const result=playTurn(s,"hold");
 assert.equal(result.finished,true);
 for(const value of Object.values(result.resources))assert.ok(value>=0&&value<=10);
});

test("turn two flare card targets power and uses Field specialist",()=>{
 let s=createGame(["doctor","field"],11);
 s=playTurn(s,"safe");
 const e=eventFor(s);
 assert.equal(e.title,"A flash on the Sun!");
 assert.equal(e.target,"power");
 assert.equal(e.cost,"crew");
 const withField=playTurn(s,"risk");
 const noFieldState={...s,crew:["doctor","scientist"]};
 const withoutField=playTurn(noFieldState,"risk");
 assert.equal(withField.log.at(-1).points,75); // Field helps, but a healthy power reserve does not justify top score
 assert.equal(withoutField.log.at(-1).points,75);
});
test("turns four and five provide NASA gap codes when applicable",()=>{
 for(let seed=0;seed<20;seed++){
  let s=createGame(["doctor","engineer"],seed);
  for(let i=0;i<3&&!s.finished;i++)s=playTurn(s,"safe");
  if(s.finished)continue;
  const event=eventFor(s);
  assert.match(event.gap,/^[0-9]{4}$/);
  s=playTurn(s,"safe");
  if(!s.finished)assert.match(eventFor(s).gap,/^[0-9]{4}$/);
 }
});
test("Hamza option B preserves one crew health on the first turn",()=>{
 const hard=playTurn(createGame(["doctor","engineer"],8,{noCrewLossTurn1:false}),"safe");
 const easier=playTurn(createGame(["doctor","engineer"],8),"safe");
 assert.equal(easier.resources.crew,hard.resources.crew+1);
 assert.equal(hard.log[0].points,easier.log[0].points);
 assert.equal(easier.resources.crew,10);
});
test("A/B resource trajectories remain bounded across team combinations and seeds",()=>{
 const roles=["doctor","engineer","field","scientist"];
 for(const b of [false,true])for(let a=0;a<roles.length;a++)for(let j=a+1;j<roles.length;j++)for(let seed=0;seed<75;seed++){
  let s=createGame([roles[a],roles[j]],seed,{noCrewLossTurn1:b});
  let step=0;
  while(!s.finished&&step++<6){
   const options=optionList(s);
   const id=options[(seed+step)%options.length].id;
   s=playTurn(s,id);
   for(const value of Object.values(s.resources))assert.ok(value>=0&&value<=10);
  }
  assert.equal(s.finished,true);
 }
});

test("v2.1: repeated risk is not automatically a top score with Field Specialist",()=>{
 const roles=["field","scientist"];
 const scores=[];
 for(let seed=0;seed<300;seed++){
  let s=createGame(roles,seed+2401);
  while(!s.finished){
   const opts=optionList(s);
   s=playTurn(s,opts.some(o=>o.id==="risk")?"risk":opts[0].id);
  }
  scores.push(s.score);
 }
 assert.ok(scores.every(s=>s<=1000));
 const perfect=scores.filter(s=>s===1000).length;
 assert.ok(perfect<10,"Repeated first-choice strategy should rarely score 1000: "+perfect);
});
test("v2.1 risk points depend on need and support, not merely Field's presence",()=>{
 const baseline=playTurn(createGame(["field","scientist"],88),"safe");
 const healthy=playTurn(baseline,"risk");
 assert.equal(healthy.log.at(-1).points,75);
 const low={...baseline,resources:{...baseline.resources,power:3,crew:8}};
 const urgent=playTurn(low,"risk");
 assert.equal(urgent.log.at(-1).points,150);
 const costly={...low,resources:{...low.resources,crew:2}};
 const reckless=playTurn(costly,"risk");
 assert.equal(reckless.log.at(-1).points,0);
});
