import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import blogReducer from "./slices/blogSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
  },
});

export default Store;
