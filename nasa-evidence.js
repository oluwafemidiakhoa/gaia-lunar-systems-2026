// Verified historical event, not a live DONKI feed. Dates are UTC.
// Source: NASA CCMC SEP event records and NOAA SWPC contemporary bulletin.
export const HISTORICAL_SPACE_WEATHER={
 id:"2017-09-10T15:35:00-FLR-001",
 kind:"Solar flare",
 classification:"X8.2",
 startUTC:"2017-09-10T15:35:00Z",
 peakUTC:"2017-09-10T16:06:00Z",
 endUTC:"2017-09-10T16:31:00Z",
 sourceName:"NASA CCMC SEP event record",
 sourceUrl:"https://ccmc.gsfc.nasa.gov/assessment/topics/SEP/campaign2020/20170910.php",
 corroborationName:"NOAA Space Weather Prediction Center",
 corroborationUrl:"https://www.spaceweather.gov/news/x82-r3-strong-x-ray-event-observed-101606-utc"
};
export const HISTORICAL_SPACE_WEATHER_CAVEAT="Observed solar flare on September 10, 2017. This historical observation does NOT establish that radiation struck a lunar crew or caused the fictional game effects. The app may separately request recent NASA DONKI data; if unavailable, this labeled historical example remains.";
