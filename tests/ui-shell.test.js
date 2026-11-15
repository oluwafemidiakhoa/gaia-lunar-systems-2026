import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {spawnSync} from "node:child_process";
test("browser module parses and review controls exist",()=>{
 const html=readFileSync(new URL("../index.html",import.meta.url),"utf8");
 const script=html.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
 assert.ok(script,"Expected browser module script");
 const parsed=spawnSync(process.execPath,["--check","--input-type=module"],{input:script,encoding:"utf8"});
 assert.equal(parsed.status,0,parsed.stderr);
 for(const id of ["review-next","review-progress","history","results"])assert.match(html,new RegExp('id="'+id+'"'));
 assert.match(html,/function showReview\(/);
 assert.match(html,/function nextReview\(/);
 assert.doesNotMatch(html,/Decision rating: /);
});

test("all game cards receive a sourced fact and the debrief uses Emir's exact text",()=>{
 const html=readFileSync(new URL("../index.html",import.meta.url),"utf8");
 const engine=readFileSync(new URL("../game-engine.js",import.meta.url),"utf8");
 for(const id of ["abundance","solar","sunset","dust","battery","water","cable","computer","last","opportunity","crisis-crew","crisis-base","crisis-parts","crisis-power","crisis-water","crisis-oxygen"]){
  assert.ok(html.includes('"'+id+'":')||html.includes(' '+id+':{'),"Missing science fact: "+id);
 }
 assert.match(html,/function shortReason\(t\)\{return t.reason/);
 assert.match(engine,/Good call! Your expert made this risk worth it/);
 assert.match(engine,/You made it, but luck helped a lot!/);
 assert.match(html,/Did you know\?/);
});
