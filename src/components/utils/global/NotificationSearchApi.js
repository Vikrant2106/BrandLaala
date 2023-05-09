import { userAxios } from "../axios/user.axios";
import { fetchAllNotificationsApi } from "../apis.utils";
import { createQueryString } from "./global";

export const getAllNotificationHandler = (offset) => {
  const term = createQueryString({
    offset,
  });
  return userAxios.get(fetchAllNotificationsApi + term);
};
