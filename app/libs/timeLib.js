const moment = require("moment");
const momenttz = require("moment-timezone");
const timeZone = "Asia/Calcutta";
let now = () => {
  return moment.utc().format();
};
let nowWithOneMinute = () => {
  return moment(this.now).add(1, "m").utc().format();
};

let getLocalTime = () => {
  return moment().tz(timeZone).format();
};

let convertToLocalTime = (time) => {
  return momenttz.tz(time, timeZone).format("LLLL");
};

let convertToLocalHoursMinutes = (time) => {
  return momenttz.tz(time, timeZone).format("h:mm a");
};
let converToLocalDayDate = (time) => {
  return momenttz.tz(time, timeZone).format("MMMM Do YYYY");
};
module.exports = {
  now: now,
  getLocalTime: getLocalTime,
  convertToLocalTime: convertToLocalTime,
  convertToLocalHoursMinutes: convertToLocalHoursMinutes,
  converToLocalDayDate: converToLocalDayDate,
  nowWithOneMinute: nowWithOneMinute,
};
