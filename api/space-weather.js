// NASA DONKI Solar Flare public observations, read-only proxy.
// Source: https://api.nasa.gov/ (DONKI FLR API). No lunar hazard inference.
const NASA_HOST="https://api.nasa.gov";
const FALLBACK_SOURCE="https://api.nasa.gov/";
export function normalizeFlare(raw){
 if(!raw||typeof raw!=="object")return null;
 const id=typeof raw.flrID==="string"?raw.flrID:null;
 const start=typeof raw.beginTime==="string"?raw.beginTime:null;
 const peak=typeof raw.peakTime==="string"?raw.peakTime:null;
 const level=typeof raw.classType==="string"?raw.classType:null;
 if(!id||!start||!peak||!level||!/^[XMCB][0-9]+(\.[0-9]+)?$/i.test(level)||Number.isNaN(Date.parse(start))||Number.isNaN(Date.parse(peak)))return null;
 const link=typeof raw.link==="string"&&raw.link.startsWith("https://kauai.ccmc.gsfc.nasa.gov/")?raw.link:null;
 return {id,date:start.slice(0,10),startUTC:start,peakUTC:peak,classification:level,type:"Solar flare",source:"NASA DONKI FLR",link:link||FALLBACK_SOURCE};
}
export default async function handler(req,res){
 res.setHeader("Cache-Control","public, s-maxage=21600, stale-while-revalidate=3600");
 res.setHeader("Content-Type","application/json; charset=utf-8");
 if(req.method!=="GET"){res.setHeader("Allow","GET");return res.status(405).json({error:"Method not allowed"});}
 const end=new Date().toISOString().slice(0,10),start=new Date(Date.now()-14*86400000).toISOString().slice(0,10);
 const params=new URLSearchParams({startDate:start,endDate:end,api_key:process.env.NASA_API_KEY||"DEMO_KEY"});
 const controller=new AbortController();
 const timeout=setTimeout(()=>controller.abort(),3500);
 try{
  const response=await fetch(NASA_HOST+"/DONKI/FLR?"+params.toString(),{signal:controller.signal,headers:{Accept:"application/json"}});
  if(!response.ok)throw Error("NASA upstream unavailable");
  const payload=await response.json();
  if(!Array.isArray(payload))throw Error("Unexpected NASA format");
  const events=payload.map(normalizeFlare).filter(Boolean).sort((a,b)=>b.peakUTC.localeCompare(a.peakUTC));
  if(!events.length)return res.status(200).json({status:"unavailable",reason:"No recent qualifying FLR observation",source:"NASA DONKI FLR",fallback:true});
  return res.status(200).json({status:"ok",event:events[0],retrievedUTC:new Date().toISOString(),source:"NASA DONKI FLR"});
 }catch{
  return res.status(200).json({status:"unavailable",reason:"NASA data temporarily unavailable",source:"NASA DONKI FLR",fallback:true});
 }finally{clearTimeout(timeout);}
}
