
import React, { useState } from "react";
import { loginUser } from "../Redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../OAuth/GoogleAuth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

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
      .then(() => navigate("/"))
      .catch(() => {});
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
    >
      <div className="container" style={{ maxWidth: "460px" }}>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-white mb-1">Welcome Back 👋</h2>
          <p className="small" style={{ color: "#a89fc4" }}>
            Sign in to continue to your account
          </p>
        </div>

        {/* Card */}
        <div
          className="card border-0 rounded-4 shadow-lg"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="card-body p-4 p-md-5">

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control rounded-3 border-0 text-white"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control rounded-3 border-0 text-white"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Error */}
              {error && (
                <div className="alert alert-danger rounded-3 py-2 text-center small mb-3">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-3 py-2 fw-semibold mb-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Logging in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <hr className="flex-grow-1" style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
                <span className="small" style={{ color: "#7a6a9a" }}>Or with</span>
                <hr className="flex-grow-1" style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
              </div>

              {/* Google Auth */}
              <GoogleAuth />

            </form>
          </div>
        </div>

        {/* Register link */}
        <p className="text-center mt-3 small" style={{ color: "#a89fc4" }}>
          Don't have an account?{" "}
          <Link to="/register" className="fw-semibold" style={{ color: "#c4aeff" }}>
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;