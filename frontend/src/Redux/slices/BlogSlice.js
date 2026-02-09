// src/Redux/Slices/BlogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBlogsApi,
  getBlogByIdApi,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
} from "../../api/blogApi";
import { likeBlog as likeBlogApi } from "../../api/likeApi";
import { addCommentApi, editCommentApi, deleteCommentApi } from "../../api/commentApi";

// ------------------ ASYNC THUNKS ------------------

// Fetch all blogs
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const res = await getBlogsApi();
  return res.data;
});

// Fetch single blog by ID
export const fetchBlogById = createAsyncThunk("blogs/fetchBlogById", async (id) => {
  const res = await getBlogByIdApi(id);
  return res.data;
});

// Create blog
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blogData, { getState }) => {
    const token = getState().auth.token;
    const res = await createBlogApi(blogData, token);
    return res.data;
  }
);

// Update blog
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, blogData, isFileUpload = false }, { getState }) => {
    const token = getState().auth.token;
    const res = await updateBlogApi(id, blogData, token, isFileUpload);
    return res.data;
  }
);

// Delete blog
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { getState }) => {
    const token = getState().auth.token;
    await deleteBlogApi(id, token);
    return id;
  }
);

// Like / Unlike blog
export const likeBlog = createAsyncThunk("blogs/likeBlog", async (id, { getState }) => {
  const token = getState().auth.token;
  const res = await likeBlogApi(id, token);
  return res.data;
});

// Add comment
export const addComment = createAsyncThunk(
  "blogs/addComment",
  async ({ blogId, text }, { getState }) => {
    const token = getState().auth.token;
    const res = await addCommentApi(blogId, text, token);
    return res.data; // full blog object
  }
);

// Edit comment
export const editComment = createAsyncThunk(
  "blogs/editComment",
  async ({ blogId, commentId, text }, { getState }) => {
    const token = getState().auth.token;
    const res = await editCommentApi(blogId, commentId, text, token);
    return res.data; // full blog object
  }
);

// Delete comment
export const deleteComment = createAsyncThunk(
  "blogs/deleteComment",
  async ({ blogId, commentId }, { getState }) => {
    const token = getState().auth.token;
    const res = await deleteCommentApi(blogId, commentId, token);
    return res.data; // full blog object
  }
);

// ------------------ SLICE ------------------
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    singleBlog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all blogs
    builder
      .addCase(fetchBlogs.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBlogs.fulfilled, (state, action) => { state.loading = false; state.blogs = action.payload; })
      .addCase(fetchBlogs.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });

    // Fetch single blog
    builder
      .addCase(fetchBlogById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBlogById.fulfilled, (state, action) => { state.loading = false; state.singleBlog = action.payload; })
      .addCase(fetchBlogById.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });

    // Create blog
    builder.addCase(createBlog.fulfilled, (state, action) => { state.blogs.push(action.payload); });

    // Update blog
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      const index = state.blogs.findIndex((b) => b._id === action.payload._id);
      if (index !== -1) state.blogs[index] = action.payload;
      if (state.singleBlog?._id === action.payload._id) state.singleBlog = action.payload;
    });

    // Delete blog
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      if (state.singleBlog?._id === action.payload) state.singleBlog = null;
    });

    // Like blog
    builder.addCase(likeBlog.fulfilled, (state, action) => {
      if (state.singleBlog?._id === action.payload._id) state.singleBlog = action.payload;
      const index = state.blogs.findIndex((b) => b._id === action.payload._id);
      if (index !== -1) state.blogs[index] = action.payload;
    });

    // Add/Edit/Delete comment
    // All return the full updated blog, so just replace singleBlog and update blogs array
    const commentActions = [addComment, editComment, deleteComment];
    commentActions.forEach((actionCreator) => {
      builder.addCase(actionCreator.fulfilled, (state, action) => {
        state.singleBlog = action.payload;
        const index = state.blogs.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) state.blogs[index] = action.payload;
      });
    });
  },
});

export default blogSlice.reducer;
