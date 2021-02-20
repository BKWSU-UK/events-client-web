const moment = require("moment")

const convertToBigCalendar = (json) => {
    const data = ((json || {}).response || {}).data;
    return data.map(event => {
        return {
            title: event.name,
            start: moment(event.startIso).toDate(),
            end: moment(event.endIso).toDate(),
            allDay: false,
            resource: event.webcastUrl || null
        }
    });
}

module.exports = {
    convertToBigCalendar
}