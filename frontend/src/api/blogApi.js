// src/api/blogApi.js
import axios from "axios";
import { API_BLOG } from "./config";

// Create blog (with or without image)
export const createBlogApi = (formData, token) =>
  axios.post(API_BLOG, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


// Get all blogs
export const getBlogsApi = () => axios.get(API_BLOG);

// Get blog by ID
export const getBlogByIdApi = (id) => axios.get(`${API_BLOG}/${id}`);

// Update blog (file upload optional)
export const updateBlogApi = (id, data, token) =>
  axios.put(`${API_BLOG}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


// Delete blog
export const deleteBlogApi = (id, token) =>
  axios.delete(`${API_BLOG}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
