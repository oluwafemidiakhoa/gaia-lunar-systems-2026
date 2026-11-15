// Gaia Lunar Systems — educational simulation, not a validated NASA engineering model.
export const MAX_TURNS = 6;
export const RESOURCE_KEYS = ["crew","base","parts","power","water","oxygen"];
export const START = { crew:10, base:10, parts:6, power:6, water:6, oxygen:6 };
export const ROLES = {
  doctor:{name:"Medical Officer",resources:["crew"],description:"Prevents crew fatigue on turns 3 and 5."},
  engineer:{name:"Systems Engineer",resources:["base","parts"],description:"Improves repairs and base responses."},
  field:{name:"Field Specialist",resources:["power"],description:"Improves solar equipment and EVA decisions."},
  scientist:{name:"Science Officer",resources:["water","oxygen"],description:"Improves water and oxygen decisions."}
};
export const EVENTS = [
  {id:"abundance",title:"Sunshine and plenty",tag:"DAY 1–5",target:"power",cost:"parts",body:"The solar panels are generating power. Do you use extra energy now, save it, or upgrade the equipment?"},
  {id:"solar",title:"Space weather alert",tag:"DAY 6–10",target:"crew",cost:"oxygen",body:"A simulated particle-radiation alert interrupts an outside task. How will your crew respond?"},
  {id:"sunset",title:"Sunset approaches",tag:"DAY 11–15",target:"power",cost:"base",body:"A long lunar night is approaching. Prepare the base and energy reserves."},
  {id:"dust",title:"Dust on the panels",tag:"DAY 16–20",target:"power",cost:"crew",body:"Moon dust is reducing the equipment's efficiency. What is the safest response?"},
  {id:"water",title:"Water recycler fault",tag:"DAY 16–20",target:"water",cost:"parts",body:"The water recycler is malfunctioning. Choose how to address the problem."},
  {id:"cable",title:"Power cable overload",tag:"DAY 16–20",target:"base",cost:"power",body:"A cable is overheating. The base needs immediate attention."},
  {id:"oxygen",title:"Air system warning",tag:"DAY 21–25",target:"oxygen",cost:"parts",body:"Oxygen production is slowing. Can the crew resolve the problem?"},
  {id:"structural",title:"Habitat seal failure",tag:"DAY 21–25",target:"base",cost:"parts",body:"A seal in the habitat is weakening. Protect the crew and habitat."},
  {id:"medical",title:"Crew fatigue",tag:"DAY 21–25",target:"crew",cost:"water",body:"Fatigue is affecting the crew's concentration and health."},
  {id:"last",title:"The last night",tag:"DAY 26–30",target:"crew",cost:"power",body:"The crew must make one final energy decision before sunrise."}
];
function rng(state) { const next = (Math.imul(1664525,state.seed) + 1013904223) >>> 0; return {value:next/4294967296,seed:next}; }
export function clamp(n) { return Math.max(0,Math.min(10,n)); }
export function createGame(crew=["doctor","engineer"],seed=Date.now()>>>0) {
  if(crew.length!==2||new Set(crew).size!==2||crew.some(c=>!ROLES[c])) throw Error("Choose two different specialists");
  return {turn:1,crew:[...crew],resources:{...START},seed:seed>>>0,pending:[],log:[],score:0,finished:false,win:false};
}
export function eventFor(game) {
  const n=game.turn;
  if(n===1)return EVENTS[0];
  if(n===2)return EVENTS[1];
  if(n===3)return EVENTS[2];
  if(n===4)return EVENTS[3+(game.seed%3)];
  if(n===5) {
    const low=RESOURCE_KEYS.filter(k=>game.resources[k]<4).sort((a,b)=>game.resources[a]-game.resources[b])[0];
    return (low==="crew"?EVENTS[8]:low==="base"?EVENTS[7]:EVENTS[6]);
  }
  return EVENTS[9];
}
export function optionList(game) {
  if(game.turn===6)return [
    {id:"shutdown",label:"Conserve energy",summary:"Shut down nonessential systems. Crew −1."},
    {id:"heat",label:"Keep full heating",summary:"Base −2; if power is low, crew also loses 2."}
  ];
  return [
    {id:"risk",label:"Take a calculated risk",summary:"Pay 1 resource; chance of +2 or −2 on the threatened resource."},
    {id:"safe",label:"Choose the safer route",summary:"A guaranteed loss of 1 threatened resource. No extra cost."},
    {id:"invest",label:"Invest for the future",summary:"Spend 1 support resource now; gain 3 threatened resource in two turns, with a 65% chance."}
  ];
}
function add(r,key,delta){r[key]=clamp(r[key]+delta);}
function scoring(game,event,choice) {
  // Ex-ante educational decision score: no outcome randomness or hindsight.
  // High stakes make conserving the threatened resource more valuable.
  const target=game.resources[event.target],cost=game.resources[event.cost];
  if(choice==="safe") return target<=3?85:target<=6?75:65;
  if(choice==="risk") return target<=3?35:cost<=2?40:target>=8?55:70;
  if(choice==="invest") return game.turn>=5?30:cost<=2?35:target<=3?55:90;
  if(choice==="shutdown") return game.resources.crew<=5?35:85;
  if(choice==="heat") return game.resources.crew<=5 && game.resources.power>=2?80:45;
  return 0;
}
function explanation(game,event,choice) {
  const t=game.resources[event.target];
  if(choice==="safe") return t<=3?"Protecting a scarce resource was a cautious decision, although it still carries a cost.":"A predictable choice limits surprises but may slowly consume precious supplies.";
  if(choice==="risk") return t<=3?"This choice exposed a nearly depleted resource to a large possible loss.":"The potential benefit may justify the gamble when there are adequate reserves.";
  if(choice==="invest") return game.turn>=5?"A delayed investment has little time to pay back before the mission ends.":"Investing early can help later, but it requires spare resources and might fail.";
  if(choice==="shutdown") return "Conserving energy reduces pressure on the systems but may tire the crew.";
  return "Heating protects the people but strains equipment and depends on available power.";
}
export function playTurn(game,choice) {
  if(game.finished)throw Error("Mission already finished");
  if(!optionList(game).some(o=>o.id===choice))throw Error("Invalid choice");
  const before={...game.resources},event=eventFor(game),r={...game.resources},pending=[];
  let seed=game.seed,roll=null;
  const pts=scoring(game,event,choice);
  let consequence="";
  // Automatic changes happen first. Doctor prevents fatigue on turns 3 and 5.
  if(game.turn<=3)add(r,"power",1);
  else {add(r,"power",-2);add(r,"water",-1);add(r,"oxygen",-1);add(r,"base",-1);}
  const doctorProtects=game.crew.includes("doctor")&&[3,5].includes(game.turn);
  if(!doctorProtects)add(r,"crew",-1);
  // Resolve previously scheduled investments before the current decision.
  const due=game.pending.filter(p=>p.turn===game.turn);
  for(const p of due){add(r,p.target,p.success?3:0);}
  if(game.turn===6) {
    if(choice==="shutdown"){add(r,"crew",-1);consequence="Energy conserved. Crew health decreased slightly.";}
    else {add(r,"base",-2);if(r.power<2)add(r,"crew",-2);consequence="Extra heating strained the base.";}
  } else if(choice==="safe") { add(r,event.target,-1);consequence="The cautious option avoided an unpredictable outcome but used some resources.";}
  else if(choice==="risk"){
    add(r,event.cost,-1);
    const specialist=game.crew.some(c=>ROLES[c].resources.includes(event.target));
    const sample=rng({seed}); seed=sample.seed;roll=sample.value;
    const success=roll<(specialist?0.7:0.5);
    add(r,event.target,success?2:-2);
    consequence=success?"The calculated risk worked this time.":"The risk did not work this time; a sound choice is not a guaranteed outcome.";
  } else {
    add(r,event.cost,-1);
    const sample=rng({seed});seed=sample.seed;roll=sample.value;
    pending.push({turn:game.turn+2,target:event.target,success:roll<0.65});
    consequence="Investment scheduled. The outcome will become visible in two turns.";
  }
  // Zero-resource cascading consequences are evaluated after all current effects.
  if(r.parts===0)add(r,"base",-1);
  if(r.base===0)add(r,"power",-1);
  if(r.power===0){add(r,"oxygen",-2);add(r,"water",-1);}
  if(r.water===0)add(r,"crew",-2);
  if(r.oxygen===0)add(r,"crew",-5);
  const finished=game.turn===6||r.crew===0;
  const win=finished&&game.turn===6&&r.crew>=5&&r.base>=5;
  const log={turn:game.turn,event:event.title,choice,points:pts,before,after:{...r},consequence,reason:explanation(game,event,choice),investmentResults:due.map(p=>({target:p.target,success:p.success}))};
  return {...game,turn:finished?game.turn:game.turn+1,resources:r,seed,finished,win,pending:[...game.pending.filter(p=>p.turn>game.turn),...pending],score:game.score+pts,log:[...game.log,log]};
}
export function debrief(game){
  if(!game.finished)return null;
  const max=game.log.length*100;
  const quality=max?game.score/max:0;
  const sound=quality>=0.7;
  const heading=game.win?(sound?"Mission success — thoughtful decisions!":"Mission success — but review your risks."):
    (sound?"Mission lost — thoughtful decisions still matter.":"Mission lost — learning from choices.");
  return {heading,score:Math.round(1000*quality),quality:sound?"strong":"developing",outcome:game.win?"SURVIVED":"MISSION ENDED",turns:game.log};
}
