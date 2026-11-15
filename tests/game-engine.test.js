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
