import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import { googlelogin } from "../Redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
  import { API_AUTH } from "../api/config";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // The credential is the ID token from Google
      const token = credentialResponse.credential;

      console.log("Google ID Token:", token);

      // Optional: decode for frontend info
      const decoded = jwtDecode(token);
      console.log("Decoded:", decoded);

    const res = await axios.post(
     `${API_AUTH}/google`,
  { token },
  { headers: { "Content-Type": "application/json" } }
   );

      dispatch(
        googlelogin({
          user: res.data.user,
          token: res.data.token,
        }),
      );
      navigate("/");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
  };

  return (
    <div className="d-flex justify-content-center">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </div>
  );
};

export default GoogleAuth;
