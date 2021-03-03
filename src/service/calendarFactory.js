const moment = require("moment")

const convertToBigCalendar = (json) => {
    const data = Array.isArray(json) ? json : ((json || {}).response || {}).data;
    const res = data ? data.map(event => {
        return {
            title: event.name,
            start: moment(event.startIso).toDate(),
            end: moment(event.endIso).toDate(),
            allDay: false,
            resource: event.webcastUrl || null,
            original: event,
            description: event.description,
            descriptionText: event.descriptionText
        }
    }) : [];
    console.log('Big Calendar data', res);
    return res;
}

module.exports = {
    convertToBigCalendar
}