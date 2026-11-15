import test from "node:test";
import assert from "node:assert/strict";
import {createGame,optionList,playTurn} from "../game-engine.js";

// Diagnostic only. Uniform random decisions are a weak baseline, not children's behavior.
test("report baseline decision scores for fixed random policies without changing rubric",()=>{
 const teams=[["doctor","engineer"],["doctor","field"],["doctor","scientist"],["engineer","field"],["engineer","scientist"],["field","scientist"]];
 const n=300,records=[];
 for(let ti=0;ti<teams.length;ti++){
  const scores=[],wins=[];
  for(let k=0;k<n;k++){
   let game=createGame(teams[ti],(ti+1)*100000+k+1);
   let x=((ti+1)*91337+k*7919+1)>>>0;
   while(!game.finished){
    x=(Math.imul(1664525,x)+1013904223)>>>0;
    const options=optionList(game);
    game=playTurn(game,options[x%options.length].id);
   }
   scores.push(game.score);wins.push(game.win);
   assert.ok(game.score>=0&&game.score<=1000);
  }
  scores.sort((a,b)=>a-b);
  const mean=Math.round(scores.reduce((a,b)=>a+b,0)/n);
  const rate=q=>Math.round(scores.filter(s=>s>=q).length*100/n);
  records.push({crew:teams[ti].join("+"),n,mean,median:scores[Math.floor(n/2)],pct700:rate(700),pct1000:rate(1000),winPct:Math.round(wins.filter(Boolean).length*100/n)});
 }
 console.log("GAIA_LUNAR_RANDOM_POLICY_BASELINE "+JSON.stringify(records));
});
