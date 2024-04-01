const fetch = require("node-fetch");
const { convertToBigCalendar } = require("../../src/service/calendarFactory");

const orgIdStr = 2;
const eventTypeIds = "1,2,3,4,5,6,7,8,9,10,11,12,13,15";
let eventsLimit = 10;

let targetUrl = `https://events.brahmakumaris.org/bkregistration/organisationEventReportController.do?orgEventTemplate=jsonEventExport.ftl&orgId=${orgIdStr}`;
targetUrl += `&eventTypeIds=${eventTypeIds}&fromIndex=0&toIndex=${eventsLimit}&mimeType=application/json`;

console.log(targetUrl);

fetch(targetUrl)
  .then((res) => res.json())
  .then((json) => {
    const conversion = convertToBigCalendar(json);
    console.log(JSON.stringify(conversion, null, 2));
  });
