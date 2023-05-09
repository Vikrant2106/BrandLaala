import { DateTime } from "luxon";

export const getFormattedTime = (timestamp, format = "DD") => {
  if (!timestamp) return "-";
  if (DateTime.fromISO(timestamp).isValid) {
    return DateTime.fromISO(timestamp).toFormat(format);
  }
  return "-";
};

export const getTimeInUTC = (jsDate) => {
  return DateTime.fromJSDate(jsDate).toUTC().toString();
};
