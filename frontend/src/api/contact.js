import axios from "axios";
import { API_CONTACT } from "./config";

export const sendContactMessage = (data) => {
  return axios.post(API_CONTACT, data);
};
