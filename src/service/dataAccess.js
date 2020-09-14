import {extractParameter} from "../utils/paramExtraction";

const eventLimit = () => extractParameter(null, 'eventsLimit', 10000);

const onlyWebcast = () => extractParameter(null, 'onlyWebcast', false);

const onlineOnly = () => extractParameter(null, 'onlineOnly', false);

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
};

function processOnlineOnly(targetUrl) {
    const isOnlineOnly = onlineOnly();
    if (isOnlineOnly === "yes") {
        targetUrl += `&onlineOnly=true`;
    } else if (isOnlineOnly === "no") {
        targetUrl += `&onlineOnly=false`;
    }
    return targetUrl;
}

export function fetchEventList(setEvents, events, params) {
    const {orgId, eventTypeIds} = params;
    if (events.length > 0) {
        return;
    }
    const orgIdStr = Array.isArray(orgId) ? orgId.join(",") : orgId;
    const eventsLimit = eventLimit();
    console.log('eventsLimit', eventsLimit);
    let targetUrl = `https://events.brahmakumaris.org/bkregistration/organisationEventReportController.do?orgEventTemplate=jsonEventExport.ftl&orgId=${orgIdStr}&eventTypeIds=${eventTypeIds}&fromIndex=0&toIndex=${eventsLimit}&mimeType=application/json`;
    const isOnlyWebcast = onlyWebcast()
    if(isOnlyWebcast) {
        targetUrl += `&onlyWebcast=${isOnlyWebcast}`;
    }
    targetUrl = processOnlineOnly(targetUrl);
    fetch(targetUrl)
        .then((response) => response.json())
        .then((json) => {
            const response = json.response;
            console.log(response);
            setEvents(response.data);
        });

    return [];
}

function fetchSingleEvent(fun, eventId) {
    if (!eventId) {
        return;
    }
    const targetUrl = `https://events.brahmakumaris.org/bkregistration/organisationEventReportController.do?simpleEventTemplate=jsonEvent.ftl&mimeType=application/json&eventIds=${eventId}`;
    fetch(targetUrl)
        .then((response) => response.json())
        .then((json) => {
            const response = json.response;
            console.log(response);
            fun(response);
        });
}

export function fetchEvent(setEvent, eventId) {
    fetchSingleEvent((response) => setEvent(response.data[0]), eventId);
}

export function fetchEventDateList(setDateList, eventId) {
    fetchSingleEvent((response) => setDateList(response.data[0].dateList), eventId);
}