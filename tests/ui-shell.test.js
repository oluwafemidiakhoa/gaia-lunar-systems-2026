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
