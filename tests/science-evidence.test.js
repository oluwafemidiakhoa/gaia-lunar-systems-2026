import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {HISTORICAL_SPACE_WEATHER as flare,HISTORICAL_SPACE_WEATHER_CAVEAT as caveat} from "../nasa-evidence.js";

test("historical NASA event retains verifiable timestamp and classification",()=>{
 assert.equal(flare.id,"2017-09-10T15:35:00-FLR-001");
 assert.equal(flare.classification,"X8.2");
 assert.equal(flare.peakUTC,"2017-09-10T16:06:00Z");
 assert.ok(flare.sourceUrl.startsWith("https://ccmc.gsfc.nasa.gov/"));
 assert.ok(flare.corroborationUrl.startsWith("https://www.spaceweather.gov/"));
 assert.match(caveat,/NOT establish/);
});
test("web interface imports historical source and labels it separately",()=>{
 const html=readFileSync(new URL("../index.html",import.meta.url),"utf8");
 assert.match(html,/from "\.\/nasa-evidence\.js"/);
 assert.match(html,/REAL NASA DATA · PAST EVENT/);
 assert.match(html,/FICTIONAL GAME EVENT/);
 assert.match(html,/\/api\/space-weather/);
 assert.match(html,/fictional, not predictions/);
});
