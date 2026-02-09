// src/api/commentApi.js
import axios from "axios";
import { API_COMMENT } from "./config";

// Add comment
export const addCommentApi = (blogId, text, token) =>
  axios.post(
    `${API_COMMENT}/${blogId}`,
    { text },
    { headers: { Authorization: `Bearer ${token}` } }
  );

// Edit comment
export const editCommentApi = (blogId, commentId, text, token) =>
  axios.put(
    `${API_COMMENT}/${blogId}/${commentId}`,
    { text },
    { headers: { Authorization: `Bearer ${token}` } }
  );

// Delete comment
export const deleteCommentApi = (blogId, commentId, token) =>
  axios.delete(`${API_COMMENT}/${blogId}/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
