import { configureStore } from "@reduxjs/toolkit";

// Import slices with exact casing
import authReducer from "./slices/authSlice";
import blogReducer from "./slices/blogSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
  },
});

export default store;
