
import React, { useState } from "react";
import { loginUser } from "../Redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../OAuth/GoogleAuth";
import { motion } from "framer-motion";

const gold   = "#e8b84b";
const dark   = "#030e1c";
const muted  = "#7a95b0";
const dimmer = "#4a6080";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const Login = () => {
  const [form, setForm]       = useState({ email: "", password: "" });
  const [focused, setFocused] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  const inputStyle = (name) => ({
    width: "100%",
    background: focused === name ? "rgba(232,184,75,.03)" : "rgba(255,255,255,.04)",
    border: `1px solid ${focused === name ? "rgba(232,184,75,.4)" : "rgba(255,255,255,.09)"}`,
    borderRadius: 12,
    color: "#fff",
    fontSize: ".95rem",
    padding: "13px 18px",
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    boxSizing: "border-box",
    boxShadow: focused === name ? "0 0 0 3px rgba(232,184,75,.07)" : "none",
    transition: "all .2s",
    display: "block",
  });

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "100px 0 80px",
        background: `
          radial-gradient(ellipse 60% 50% at 90% 10%, rgba(232,184,75,.07) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 5% 90%,  rgba(37,99,235,.07)  0%, transparent 60%),
          linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)
        `,
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}>
      <div className="container">
        <div className="row align-items-center justify-content-center gy-5">

          {/* ── LEFT SIDE TEXT ── */}
          <div className="col-lg-4 d-none d-lg-flex flex-column align-items-center">
            <motion.div
              {...fadeUp(0.2)}
              style={{ textAlign: "center" }}>

              {/* big lock icon */}
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 160, height: 160, borderRadius: "50%", margin: "0 auto 32px",
                  background: "radial-gradient(circle at 40% 35%, rgba(232,184,75,.15), rgba(232,184,75,.03))",
                  border: "1px solid rgba(232,184,75,.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "4.5rem",
                  boxShadow: "0 0 60px rgba(232,184,75,.08)",
                }}>
                🔐
              </motion.div>

              <p style={{ fontSize: ".72rem", color: muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>
                Welcome Back
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#fff", fontWeight: 700, lineHeight: 1.3, marginBottom: 16 }}>
                Continue your<br />
                <em style={{ color: gold }}>blogging journey</em>
              </p>
              <p style={{ fontSize: ".85rem", color: muted, lineHeight: 1.7 }}>
                Sign in to access your blogs, share stories, and connect with the community.
              </p>

              {/* decorative dots */}
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 32 }}>
                {[gold, "rgba(232,184,75,.4)", "rgba(232,184,75,.2)"].map((bg, i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: bg }} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── FORM CARD ── */}
          <div className="col-12 col-lg-6">
            <motion.div
              {...fadeUp(0)}
              className="position-relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 24,
                padding: "48px 44px",
                maxWidth: 560,
                margin: "0 auto",
              }}>

              {/* Gold top line */}
              <div className="position-absolute top-0 start-0 end-0"
                style={{ height: 2, background: "linear-gradient(90deg, transparent, #e8b84b, transparent)" }} />

              {/* Header */}
              <div className="mb-4">
                <p className="d-inline-flex align-items-center gap-2 mb-2"
                  style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: gold }}>
                  <span style={{ width: 26, height: 1, background: gold, display: "inline-block" }} />
                  Sign In
                </p>
                <h1 className="mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
                  Welcome <em style={{ fontStyle: "italic", color: gold }}>Back</em> 👋
                </h1>
                <p style={{ fontSize: ".9rem", color: muted, marginBottom: 0 }}>
                  Sign in to continue to your account.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>

                {/* Email */}
                <div className="mb-3">
                  <label className="d-block mb-2"
                    style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: muted }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={inputStyle("email")}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="d-block mb-2"
                    style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: muted }}>
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      style={{ ...inputStyle("password"), paddingRight: 48 }}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", color: dimmer, cursor: "pointer", fontSize: "1rem" }}>
                      {showPass ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 px-3 py-2 rounded-3"
                    style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", color: "#fca5a5", fontSize: ".85rem" }}>
                    ⚠ {error}
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="w-100 border-0 fw-bold text-uppercase mb-4"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                  whileHover={!loading ? { backgroundColor: "#f5d98a", y: -2, boxShadow: "0 12px 30px rgba(232,184,75,.3)" } : {}}
                  style={{
                    background: gold, color: dark,
                    fontSize: ".92rem", letterSpacing: ".8px",
                    borderRadius: 50, padding: 15,
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1,
                    boxShadow: "0 4px 20px rgba(232,184,75,.2)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                  {loading ? (
                    <span className="d-inline-flex align-items-center gap-2 justify-content-center">
                      Signing In
                      {[0, 0.16, 0.32].map((delay, i) => (
                        <motion.span key={i}
                          style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: dark }}
                          animate={{ scale: [0.7, 1, 0.7], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay }} />
                      ))}
                    </span>
                  ) : "🔐 Sign In"}
                </motion.button>

                {/* Divider */}
                <div className="d-flex align-items-center gap-2 mb-4">
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }} />
                  <span style={{ fontSize: ".75rem", color: dimmer, letterSpacing: "1px", textTransform: "uppercase" }}>Or continue with</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }} />
                </div>

                {/* Google — centered */}
                <div className="d-flex justify-content-center">
                  <GoogleAuth />
                </div>

              </form>
            </motion.div>

            {/* Register link */}
            <motion.p {...fadeUp(0.2)} className="text-center mt-4"
              style={{ color: muted, fontSize: ".88rem" }}>
              Don't have an account?{" "}
              <Link to="/register"
                style={{ color: gold, fontWeight: 700, textDecoration: "none", borderBottom: `1px solid rgba(232,184,75,.3)`, paddingBottom: 1 }}>
                Register
              </Link>
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Login;