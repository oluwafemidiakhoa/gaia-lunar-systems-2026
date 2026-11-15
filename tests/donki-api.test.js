import test from "node:test";
import assert from "node:assert/strict";
import {normalizeFlare} from "../api/space-weather.js";
test("valid NASA DONKI flare response is reduced to safe verified fields",()=>{
 const f=normalizeFlare({flrID:"2026-11-10T01:00:00-FLR-001",beginTime:"2026-11-10T01:00:00Z",peakTime:"2026-11-10T01:12:00Z",classType:"M2.1",link:"https://kauai.ccmc.gsfc.nasa.gov/DONKI/view/FLR/1"});
 assert.equal(f.classification,"M2.1");
 assert.equal(f.date,"2026-11-10");
 assert.equal(f.source,"NASA DONKI FLR");
 assert.equal(Object.hasOwn(f,"lunarImpact"),false);
});
test("malformed and non-flare data cannot be labeled a verified observation",()=>{
 assert.equal(normalizeFlare(null),null);
 assert.equal(normalizeFlare({flrID:"bad",beginTime:"not-time",peakTime:"not-time",classType:"X5"}),null);
 assert.equal(normalizeFlare({flrID:"x",beginTime:"2026-11-10T01:00Z",peakTime:"2026-11-10T01:12Z",classType:"unknown"}),null);
});
