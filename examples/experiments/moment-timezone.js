var moment = require("moment-timezone");
const timeLA = moment().tz("Europe/London").format();
console.log(timeLA);

const sampleMoment = moment("2020-07-06T10:00");

console.log(sampleMoment.tz("Europe/London").format());
console.log(sampleMoment.tz("Europe/Vienna").format());

const sampleMoment2 = moment.tz("2020-07-06 10:00", "America/Los_Angeles");
console.log(
  "2020-07-06T10:00",
  "where you are",
  sampleMoment2.tz(moment.tz.guess()).format(),
);
console.log(
  "2020-07-06T10:00",
  "London",
  sampleMoment2.tz("Europe/London").format(),
);
console.log(
  "2020-07-06T10:00",
  "Lisbon",
  sampleMoment2.tz("Europe/Lisbon").format(),
);
console.log(
  "2020-07-06T10:00",
  "Vienna",
  sampleMoment2.tz("Europe/Vienna").format(),
);
console.log(
  "2020-07-06T10:00",
  "Madrid",
  sampleMoment2.tz("Europe/Madrid").format(),
);
console.log(
  "2020-07-06T10:00",
  "Buenos Aires",
  sampleMoment2.tz("America/Argentina/Buenos_Aires").format(),
);
console.log(
  "2020-07-06T10:00",
  "Bogota",
  sampleMoment2.tz("America/Bogota").format(),
);
console.log(
  "2020-07-06T10:00",
  "New_York",
  sampleMoment2.tz("America/New_York").format(),
);
console.log(
  "2020-07-06T10:00",
  "Sao_Paulo",
  sampleMoment2.tz("America/Sao_Paulo").format(),
);
console.log(
  "2020-07-06T10:00",
  "Helsinki",
  sampleMoment2.tz("Europe/Helsinki").format(),
);
console.log(
  "2020-07-06T10:00",
  "Dublin",
  sampleMoment2.tz("Europe/Dublin").format(),
);
console.log(
  "2020-07-06T10:00",
  "Auckland",
  sampleMoment2.tz("Pacific/Auckland").format(),
);
console.log(
  "2020-07-06T10:00",
  "America/Los_Angeles",
  sampleMoment2.tz("America/Los_Angeles").format(),
);

console.log(moment.tz.guess());

var a = moment.tz("2013-11-18 11:55", "Asia/Taipei");
var b = moment.tz("2013-11-18 11:55", "America/Toronto");

console.log(a.format()); // 2013-11-18T19:55:00+08:00
console.log(b.format()); // 2013-11-18T06:55:00-05:00

// a.utc().format(); // 2013-11-18T11:55Z
// b.utc().format(); // 2013-11-18T11:55Z
