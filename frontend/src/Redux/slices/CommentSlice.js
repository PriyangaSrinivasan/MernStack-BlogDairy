// src/Redux/Slices/CommentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_COMMENT;

// Add comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ blogId, text }, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.post(
      `${API_URL}/${blogId}`,
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
);

// Edit comment
export const editComment = createAsyncThunk(
  "comments/editComment",
  async ({ blogId, commentId, text }, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.put(
      `${API_URL}/${blogId}/${commentId}`,
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
);

// Delete comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ blogId, commentId }, { getState }) => {
    const token = getState().auth.token;
    await axios.delete(`${API_URL}/${blogId}/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return commentId;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: { loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addComment.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(editComment.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default commentSlice.reducer;
