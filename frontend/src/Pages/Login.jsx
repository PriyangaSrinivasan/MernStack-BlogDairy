import React, { useState } from "react";
import BubbleBackground from "../Components/Bubblebg";
import { loginUser } from "../Redux/slices/authSlice"; // ✅ Use loginUser here
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import GoogleAuth from "../OAuth/GoogleAuth";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form))
      .unwrap()
      .then(() => navigate("/")) // Redirect after successful login
      .catch(() => {});
  };

  return (
    <BubbleBackground>
      <StyledWrapper className="d-flex justify-content-center align-items-center vh-100">
        <form className="form" onSubmit={handleSubmit}>
          <div className="flex-column">
            <label>Email</label>
          </div>

          <div className="inputForm">
            <input
              placeholder="Enter your Email"
              name="email"
              type="email"
              className="input"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-column">
            <label>Password</label>
          </div>

          <div className="inputForm">
            <input
              placeholder="Enter your Password"
              name="password"
              type="password"
              className="input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="button-submit" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
          </button>

          {error && <p className="p text-danger">{error}</p>}

          <p className="p line">Or With</p>

          {/* Google Button */}
          <GoogleAuth />

          <p className="p">
            Don't have an account?{" "}
            <Link to="/register" className="span">
              Register
            </Link>
          </p>
        </form>
      </StyledWrapper>
    </BubbleBackground>
  );
};

export default Login;

/* ------------------ Styled Components ------------------ */

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: linear-gradient(45deg, skyblue, darkblue);
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    transition: background 0.3s ease;
  }

  .form:hover {
    background: linear-gradient(45deg, darkblue, skyblue);
  }

  .title {
    text-align: center;
    color: white;
    font-weight: 700;
    margin-bottom: 10px;
  }

  label {
    color: white;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10em;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    background-color: white;
  }

  .input {
    border: none;
    width: 100%;
    height: 100%;
    margin-left: 10px;
    border-radius: 10rem;
  }

  .input:focus {
    outline: none;
  }

  .button-submit {
    padding: 12px;
    border-radius: 10em;
    border: 2px solid white;
    background: transparent;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s ease;
    margin-top: 10px;
  }

  .button-submit:hover {
    background: royalblue;
  }

  .p {
    text-align: center;
    color: white;
  }

  .span {
    color: yellow;
    cursor: pointer;
  }

  .line {
    margin: 10px 0;
  }
`;

// import React, { useState } from "react";
// import axios from "axios";
// import { GoogleLogin } from "@react-oauth/google";
// import {jwtDecode} from "jwt-decode";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // ===================== EMAIL / PASSWORD LOGIN =====================
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { email, password },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       console.log("Login response:", res.data);

//       // Save token & user info
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       alert(`Welcome, ${res.data.user.name}`);
//     } catch (err) {
//       console.error("Login error:", err);
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   // ===================== GOOGLE LOGIN =====================
//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const token = credentialResponse.credential;
//       console.log("Google ID Token:", token);

//       // Optional decode for frontend
//       const decoded = jwtDecode(token);
//       console.log("Decoded:", decoded);

//       const res = await axios.post(
//         "http://localhost:5000/api/auth/google",
//         { token },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       console.log("Backend response:", res.data);

//       // Save backend JWT & user info
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       alert(`Welcome, ${res.data.user.name} (Google)`);
//     } catch (err) {
//       console.error("Google login failed:", err);
//       alert(err.response?.data?.message || "Google login failed");
//     }
//   };

//   const handleGoogleError = () => {
//     console.error("Google login failed");
//     alert("Google login failed");
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{ width: "100%", marginBottom: "10px" }}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{ width: "100%", marginBottom: "10px" }}
//           />
//         </div>
//         <button type="submit" style={{ width: "100%" }}>
//           Login
//         </button>
//       </form>

//       <hr style={{ margin: "20px 0" }} />

//       <div>
//         <GoogleLogin
//           onSuccess={handleGoogleSuccess}
//           onError={handleGoogleError}
//         />
//       </div>
//     </div>
//   );
// };

// export default Login;
