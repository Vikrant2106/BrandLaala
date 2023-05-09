import { DateTime } from "luxon";

export const dateKeys = [
  "actual_delivery_date",
  "actual_start_day_of_delivery",
  "expected_delivery_date",
  "expected_start_day_of_delivery",
];

export function datePickerToUST(date) {
  if (!date) return null;
  return DateTime.fromISO(new Date(date).toISOString(), {
    zone: "system",
  })
    .toUTC()
    .toISO();
}

export function UTCToIST(d) {
  if (d == null) return null;
  try {
    const date = new Date(d + "Z");
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .replace("Z", "");
  } catch (e) {
    return null;
  }
}

export const changeIncomingDates = (data, keys) => {
  data = data.map((d) => {
    keys.forEach((key) => {
      d[key] = UTCToIST(d[key]);
    });
    return d;
  });

  return data;
};

export const changeOutgoingDates = (data, keys) => {
  keys.forEach((key) => {
    data[key] = datePickerToUST(data[key]);
  });
  return data;
};
