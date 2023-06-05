import axios from "axios";
import { failureToast } from "../../toast/toast";

const BASE_URL = process.env.REACT_APP_API_URL;

export const defaultAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

defaultAxios.interceptors.response.use(
  (response) => {

  return response;
    // return Promise.reject(response.data?.err);
  },
  (error) => {

    const { response } = error;
 
    const message = response?.data?.err || "Something Went Wrong";
    failureToast(message);
    return Promise.reject(message);
  }
);
