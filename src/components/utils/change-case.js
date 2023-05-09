import * as changeCase from "change-case";

function getProcessValue(value) {
  return !value ? "" : value;
}

export const capitalCase = (value) =>
  changeCase.capitalCase(getProcessValue(value));

export const noCase = (value) => changeCase.noCase(getProcessValue(value));

export const sentenceCase = (value) =>
  changeCase.sentenceCase(getProcessValue(value));
