// Gaia Lunar Systems: educational simulation mechanics, NOT validated NASA engineering data.
// Rules adapted from Emir Besnili's Game System v2, PR #3.
export const MAX_TURNS=6;
export const RESOURCE_KEYS=["crew","base","parts","power","water","oxygen"];
export const START={crew:10,base:10,parts:6,power:6,water:6,oxygen:6};
export const ROLES={
 doctor:{name:"Medical Officer",resources:["crew"],description:"Prevents routine crew fatigue on turns 3 and 5."},
 engineer:{name:"Systems Engineer",resources:["base","parts"],description:"Improves habitat maintenance and engineering responses."},
 field:{name:"Field Specialist",resources:["power"],description:"Improves solar equipment and outside-work decisions."},
 scientist:{name:"Science Officer",resources:["water","oxygen"],description:"Improves water and oxygen decisions."}
};
export const EVENTS=[
 {id:"abundance",title:"Sunshine and plenty",tag:"DAY 1–5",target:"power",cost:"parts",body:"Extra solar energy is tempting. Enjoy it, play safe or invest in storage?"},
 {id:"solar",title:"A flash on the Sun!",tag:"DAY 6–10",target:"power",cost:"crew",body:"NASA records real solar flares. Charged particles may arrive later—or not at all. In our fictional mission, choose whether to finish the outside job or protect equipment; this solar-flare observation does not confirm lunar radiation exposure."},
 {id:"sunset",title:"Sunset approaches",tag:"DAY 11–15",target:"power",cost:"base",body:"The long lunar night approaches. Prepare energy reserves before the Sun sets."},
 {id:"dust",gap:"0801",gapLabel:"Lunar Dust-Tolerant Systems and Dust Mitigation",title:"Dust on the panels",tag:"DAY 16–20",target:"power",cost:"crew",body:"Moon dust can interfere with equipment. How will you respond?"},
 {id:"battery",gap:"0901",gapLabel:"Scalable Lunar Surface Power Generation",title:"Power-storage problem",tag:"DAY 16–20",target:"power",cost:"parts",body:"The batteries are losing stored energy. You need a plan."},
 {id:"water",gap:"0303",gapLabel:"Dormancy Recovery for Habitat Water Storage, Distribution, and Reclamation",title:"Water recycler fault",tag:"DAY 16–20",target:"water",cost:"power",body:"The water system is not operating normally."},
 {id:"cable",gap:"0903",gapLabel:"Power Management and Distribution between Surface Elements",title:"Power cable overload",tag:"DAY 16–20",target:"base",cost:"power",body:"An overloaded circuit threatens the habitat."},
 {id:"computer",gap:"0201",gapLabel:"Extreme Environment Avionics",title:"Computer keeps crashing",tag:"DAY 16–20",target:"base",cost:"parts",body:"A controller repeatedly restarts in the cold."},
 {id:"last",title:"The last night",tag:"DAY 26–30",target:"crew",cost:"power",body:"Energy is running low. Choose whether to shut down equipment or protect the heating."}
];
const CRISIS={
 crew:{title:"Someone is sick",go:{target:"crew",specialist:"doctor"},hold:{target:"base",specialist:"engineer"}},
 base:{title:"The base is cracking",go:{target:"base",specialist:"engineer"},hold:{target:"base",specialist:"engineer"}},
 parts:{title:"Nothing left to fix with",go:{target:"base",specialist:"engineer"},hold:{target:"base",specialist:"engineer"}},
 power:{title:"The battery is freezing",go:{target:"crew",specialist:"field"},hold:{target:"base",specialist:"engineer"}},
 water:{title:"Is the water safe?",go:{target:"crew",specialist:"scientist"},hold:{target:"base",specialist:"engineer"}},
 oxygen:{title:"Running out of air",go:{target:"crew",specialist:"scientist"},hold:{target:"base",specialist:"engineer"}}
};
export const WARNINGS={
 crew:"Crew very tired! If health reaches zero, the mission ends.",
 base:"Base damaged! A broken base disrupts its systems.",
 parts:"Almost no spare parts! Without them, the base slowly breaks.",
 power:"Power very low! Air and water recycling need electricity.",
 water:"Water very low! Dehydration threatens crew health.",
 oxygen:"Oxygen very low! Without air, the crew is in danger."
};
const random=seed=>{const next=(Math.imul(1664525,seed)+1013904223)>>>0;return {seed:next,value:next/4294967296};};
export const clamp=n=>Math.max(0,Math.min(10,n));
const add=(r,key,n)=>{r[key]+=n;};
const normalize=r=>{for(const key of RESOURCE_KEYS)r[key]=clamp(r[key]);};
export function createGame(crew=["doctor","engineer"],seed=Date.now()>>>0,config={}){
 if(crew.length!==2||new Set(crew).size!==2||crew.some(c=>!ROLES[c]))throw Error("Choose two different specialists");
 return {turn:1,crew:[...crew],resources:{...START},seed:seed>>>0,pending:[],log:[],score:0,finished:false,win:false,config:{noCrewLossTurn1:config.noCrewLossTurn1!==false}};
}
export function eventFor(g){
 if(g.turn===1)return EVENTS[0];
 if(g.turn===2)return EVENTS[1];
 if(g.turn===3)return EVENTS[2];
 if(g.turn===4)return EVENTS[3+(g.seed%5)];
 if(g.turn===6)return EVENTS[8];
 const low=RESOURCE_KEYS.filter(k=>g.resources[k]<4).sort((a,b)=>g.resources[a]-g.resources[b])[0];
 if(!low)return {id:"opportunity",gap:"0805",gapLabel:"Autonomous Surface Mobility and Navigation",title:"A mysterious lunar cave",tag:"DAY 21–25",target:"crew",cost:"base",body:"Your outpost is stable enough to explore or strengthen the habitat.",go:{target:"crew",specialist:"field"},hold:{target:"base",specialist:"engineer"},low:null};
 return {id:"crisis-"+low,gap:({"crew":"0405","base":"0501","parts":"0502","power":"0901","water":"0304","oxygen":"0601"})[low],gapLabel:({"crew":"Exploration Medical Capabilities for Deep Space Missions","base":"Robotic Inspection, Maintenance, and Repair","parts":"In-situ Manufacturing of Spares, Repairs, and New Parts","power":"Scalable Lunar Surface Power Generation","water":"Habitat Environmental Monitors and Capabilities to Support Deep Space Missions","oxygen":"Oxygen Extraction from Lunar Regolith"})[low],title:CRISIS[low].title,tag:"DAY 21–25",target:low,cost:"parts",body:"A critical resource is low. Choose who should respond.",...CRISIS[low],low};
}
export function optionList(g){
 if(g.turn===6)return [
  {id:"shutdown",label:"Shut down equipment",summary:"Crew −2 after routine night costs."},
  {id:"heat",label:"Keep the heat on",summary:"Base −2, and Crew −3 if Power is below 2."}
 ];
 if(g.turn===5){const e=eventFor(g);return [
  {id:"go",label:e.low?"Go fix it":"Explore the cave",summary:"A specialist-led risk: chance of +3 or −2, with a bonus to the low resource on crisis success."},
  {id:"hold",label:e.low?"Hold on":"Strengthen the base",summary:"A different risky response: chance of +3 or −2."}
 ];}
 if(g.turn===1)return [
  {id:"risk",label:"Use extra power now",summary:"Enjoy a treat: Crew health +1 (up to 10), Power −3 (certain)."},
  {id:"safe",label:"Play safe",summary:"Power −1 (certain)."},
  {id:"invest",label:"Invest in storage",summary:"Spare parts −1; 50% chance of Power +2 on turn 3."}
 ];
 return [
 {id:"risk",label:"Take a calculated risk",summary:"Spend a support resource for a chance to recover the threatened resource."},
 {id:"safe",label:"Play safe",summary:"Accept a smaller, certain loss of the threatened resource."},
 {id:"invest",label:"Invest for later",summary:"Pay now for a 50% chance of a bonus two turns later."}
 ];
}
function dueInvestments(g,r){
 const due=g.pending.filter(p=>p.turn===g.turn);
 for(const p of due)if(p.success)add(r,p.target,p.bonus);
 return due;
}
function automatic(g,r){
 if(g.turn<=3)add(r,"power",1);
 else {add(r,"power",-2);add(r,"water",-1);add(r,"oxygen",-1);add(r,"base",-1);}
 if(!(g.crew.includes("doctor")&&[3,5].includes(g.turn))&&!(g.turn===1&&g.config?.noCrewLossTurn1))add(r,"crew",-1);
}
function zeroPenalties(r){
 if(r.parts<=0)add(r,"base",-1);
 if(r.base<=0)add(r,"power",-1);
 if(r.power<=0){add(r,"oxygen",-2);add(r,"water",-1);}
 if(r.water<=0)add(r,"crew",-2);
 if(r.oxygen<=0)add(r,"crew",-5);
}
function scoreDecision(g,e,choice,r){
 const has=key=>g.crew.includes(key);
 const graded=(points,reason)=>({points,rating:points===150||points===250?"Good":points===75?"OK":"Poor",reason});
 if(g.turn===1){
  if(choice==="risk")return graded(0,"Fun now, but that power was needed for the night.");
  if(choice==="invest")return graded(150,"Smart! Saving up for the long, dark night.");
  return graded(75,"Safe, but saving the extra power was even better.");
 }
 if(g.turn>=2&&g.turn<=4){
  const targetLow=r[e.target]<=3,costHealthy=r[e.cost]>=4;
  const specialist=Object.entries(ROLES).some(([id,role])=>has(id)&&role.resources.includes(e.target));
  if(choice==="risk"){
   // Proposed v2.1 calibration: specialist support alone is not enough for Good.
   // The threatened resource must genuinely need attention, and the cost must be affordable.
   const target=r[e.target];
   if(!costHealthy)return graded(0,"Careful! You paid with something that was already running low.");
   if(target>=8)return graded(0,"No need to gamble. You already had plenty.");
   if(!specialist&&targetLow)return graded(0,"Risky! It was already low and no expert could help.");
   if(specialist&&target<=5)return graded(150,"Good call! Your expert made this risk worth it.");
   if(specialist)return graded(75,"Your expert helped, but this risk wasn't needed yet.");
   if(target<=5)return graded(75,"It needed help, but no expert could make it safer.");
   return graded(0,"No expert and no rush. This gamble wasn't needed.");
  }
  if(choice==="safe"){
   if(targetLow)return graded(150,"Good call! You protected something that was running low.");
   if(specialist||costHealthy)return graded(0,"There was a better choice. Playing safe still cost you.");
   return graded(75,"Fair choice. Nothing better was available.");
  }
  if(costHealthy&& !targetLow)return graded(150,"Smart! You used your spare supplies for later.");
  if(costHealthy)return graded(75,"Nice idea, but it might run out before help arrives.");
  return graded(0,"Careful! You spent something that was already low.");
 }
 if(g.turn===5){
  const selected=e[choice],other=e[choice==="go"?"hold":"go"],have=has(selected.specialist),otherHave=has(other.specialist);
  if(have)return graded(150,"Good call! The right expert for the job.");
  if(otherHave)return graded(0,"Your expert was ready for the other choice.");
  if(choice==="go")return graded(75,"Brave! No expert, but you faced the problem.");
  return graded(0,"Waiting didn't help. Facing the problem was better.");
 }
 if(g.turn===6){
  const predicted=k=>{
   const s={...r};
   if(k==="shutdown")add(s,"crew",-2);
   else {add(s,"base",-2);if(s.power<2)add(s,"crew",-3);}
   return s;
  };
  const a=predicted("shutdown"),b=predicted("heat");
  const wins=s=>s.crew>=5&&s.base>=5;
  let best;
  if(wins(a)||wins(b))best=wins(choice==="shutdown"?a:b);
  else best=(choice==="shutdown"?a.crew+a.base:b.crew+b.base)>=Math.max(a.crew+a.base,b.crew+b.base);
  return best?graded(250,"Good call! You picked what kept your crew and base safest."):graded(0,"The other choice would have kept your crew and base safer.");
 }
 throw Error("Unknown turn");
}
export function playTurn(g,choice){
 if(g.finished)throw Error("Mission already finished");
 if(!optionList(g).some(o=>o.id===choice))throw Error("Invalid choice");
 const e=eventFor(g),before={...g.resources},r={...g.resources};
 const due=dueInvestments(g,r),pending=[];
 normalize(r);
 // The final-turn decision is evaluated after automatic night costs, per v2 §3.
 let grade=g.turn===6?null:scoreDecision(g,e,choice,{...r});
 let seed=g.seed,consequence="",roll=null;
 const draw=()=>{const x=random(seed);seed=x.seed;roll=x.value;return roll;};
 const finish=(ended,won)=>{
  normalize(r);
  const log={turn:g.turn,event:e.title,choice,points:grade.points,rating:grade.rating,reason:grade.reason,before,after:{...r},consequence,roll,investmentResults:due.map(p=>({target:p.target,success:p.success}))};
  return {...g,turn:ended?g.turn:g.turn+1,resources:r,seed,pending:[...g.pending.filter(p=>p.turn>g.turn),...pending],score:g.score+grade.points,finished:ended,win:won,log:[...g.log,log]};
 };
 if(g.turn===6){
  automatic(g,r);normalize(r);zeroPenalties(r);normalize(r);
  grade=scoreDecision(g,e,choice,{...r});
  if(r.crew<=0){consequence="Critical resources failed before the final decision.";return finish(true,false);}
  if(choice==="shutdown"){add(r,"crew",-2);consequence="Equipment shut down to conserve energy; crew health fell.";}
  else {add(r,"base",-2);if(r.power<2)add(r,"crew",-3);consequence="Heating remained on, increasing stress on the habitat.";}
  normalize(r);
  return finish(true,r.crew>=5&&r.base>=5);
 }
 if(g.turn===5){
  const action=e[choice],success=draw()<(g.crew.includes(action.specialist)?0.75:0.35);
  add(r,action.target,success?3:-2);
  if(success&&choice==="go"&&e.low)add(r,e.low,2);
  consequence=success?"The response worked and the crew stabilized the situation.":"The response failed this time; probabilities are part of this game model.";
 }else if(g.turn===1){
  if(choice==="risk"){add(r,"crew",1);add(r,"power",-3);consequence="Your astronauts enjoyed a break, but the batteries lost power. Crew health is not crew size.";}
  if(choice==="safe"){add(r,"power",-1);consequence="Power was conserved cautiously, with a small loss.";}
  if(choice==="invest"){add(r,"parts",-1);pending.push({turn:3,target:"power",bonus:2,success:draw()<0.5});consequence="Investment made; the result will be revealed on turn 3.";}
 }else if(choice==="safe"){
  add(r,e.target,g.turn===3?-2:-1);
  consequence="A modest loss was accepted in exchange for certainty.";
 }else if(choice==="risk"){
  add(r,e.cost,-1);
  const specialist=Object.entries(ROLES).some(([id,v])=>g.crew.includes(id)&&v.resources.includes(e.target));
  const success=draw()<(specialist?0.7:0.5);
  add(r,e.target,success?2:g.turn===3?-3:-2);
  consequence=success?"The attempt worked.":"The attempt failed; even informed decisions have uncertain outcomes.";
 }else{
  const cost=g.turn===4?-1:-2,bonus=g.turn===4?2:3;
  add(r,e.cost,cost);
  pending.push({turn:g.turn+2,target:e.target,bonus,success:draw()<0.5});
  consequence="An investment was made; its result arrives after two turns.";
 }
 automatic(g,r);zeroPenalties(r);normalize(r);
 return finish(r.crew<=0,false);
}
export function debrief(g){
 if(!g.finished)return null;
 const high=g.score>=700;
 const heading=g.win?(high?"Mission Control is proud of you! Great choices paid off.":"You made it, but luck helped a lot!"):
  (high?"Smart choices! The Moon was just tough this time.":"The mission didn't make it. Let's see what went wrong.");
 const poor=g.log.filter(x=>x.rating==="Poor");
 const unsuccessful=g.log.filter(x=>x.roll!==null&&/failed|did not work/i.test(x.consequence));
 const worst=unsuccessful.length?unsuccessful.reduce((a,b)=>{
  const loss=t=>RESOURCE_KEYS.reduce((sum,k)=>sum+Math.max(0,t.before[k]-t.after[k]),0);
  return loss(b)>loss(a)?b:a;
 }):null;
 const drop=RESOURCE_KEYS.map(k=>({key:k,value:Math.max(0,START[k]-g.resources[k])}))
   .sort((a,b)=>b.value-a.value)[0]?.key||"power";
 const tips={
  crew:"Keep your crew healthy. A Medical Officer helps a lot.",
  base:"Protect your base before the last night.",
  parts:"Save some spare parts for emergencies.",
  power:"Save power while the Sun is up. Night is long!",
  water:"Keep an eye on your water.",
  oxygen:"Watch your oxygen. Running out ends the mission fast."
 };
 const lesson=poor.length?null:worst
  ?"Turn "+worst.turn+" had an unfavorable random outcome. Your decision is scored separately from that outcome."
  :"No Poor decisions were identified; review how your resources changed over six turns.";
 return {heading,score:g.score,quality:high?"strong":"developing",outcome:g.win?"SURVIVED":"MISSION ENDED",
  turns:g.log,poor,lesson,tip:tips[drop],mostTroubled:drop};
}
