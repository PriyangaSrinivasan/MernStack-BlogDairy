// src/api/likeApi.js
import axios from "axios";
import { API_LIKE } from "./config";

// Like / Unlike blog
export const likeBlog = (blogId, token) =>
  axios.post(
    `${API_LIKE}/${blogId}`,  
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
