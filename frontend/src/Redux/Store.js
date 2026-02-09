import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import blogReducer from "./slices/blogSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
  },
});

export default store;
