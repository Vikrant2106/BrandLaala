import { ACCESS_TOKEN } from "../constant";

export const storeAccessToken = (token) =>
  localStorage.setItem(ACCESS_TOKEN, token);

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};
