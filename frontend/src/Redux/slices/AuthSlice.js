import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import { loginApi,registerApi } from "../../api/authApi";

// Register

export const registerUser = createAsyncThunk("auth/registerUser",async(data,thunkAPI)=>{
    try {
        const res = await registerApi(data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Registration failed"
        );
    }
});

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const res = await loginApi(data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// Load Initial State(from Localstorage)

    const token =localStorage.getItem("token");
    const user = localStorage.getItem("user") 
        ?JSON.parse(localStorage.getItem("user"))
        :null

    const initialState ={
        user: user,
        token: token,
        loading:false,
        error:null,
    };

    // Slice
    const authSlice = createSlice({
        name:"auth",
        initialState,
        reducers:{
            logout(state){
                state.user = null,
                state.token =null,
                state.error= null,

                localStorage.removeItem("token");
                localStorage.removeItem("user");
            },
            // Google login manual dispatch
            googlelogin(state,action){
              state.user = action.payload.user;
              state.token = action.payload.token;
              state.error = null;

                localStorage.setItem("token",action.payload.token);
                localStorage.setItem("user",JSON.stringify(action.payload.user))
            }
        },

        extraReducers:(builder)=>{
            builder
            // Register
            .addCase(registerUser.pending,(state)=>{
                state.loading = true;
            })
            .addCase(registerUser.fulfilled,(state)=>{
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })

            // login
            .addCase(loginUser.pending,(state)=>{
                state.loading = true;
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                 state.error = null;
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            });
        }
    });

    export const{logout,googlelogin}=authSlice.actions;
    export default authSlice.reducer;
   