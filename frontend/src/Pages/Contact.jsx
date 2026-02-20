
// import React, { useState } from "react";
// import axios from "axios";
// import { sendContactMessage } from "../api/contact";


// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [sending, setSending] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setSending(true);
//        const res = await sendContactMessage(formData);
//       alert(res.data.message);
//       setFormData({ name: "", email: "", message: "" });
//     } catch (err) {
//       alert("Message failed");
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <div
//       className="min-vh-100 d-flex align-items-center justify-content-center py-5"
//       style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
//     >
//       <div className="container" style={{ maxWidth: "560px" }}>

//         {/* Header */}
//         <div className="text-center mb-4">
//           <h2 className="fw-bold text-white mb-1">📩 Contact Us</h2>
//           <p className="small" style={{ color: "#a89fc4" }}>
//             We'd love to hear from you. Send us a message and we'll respond shortly.
//           </p>
//         </div>

//         {/* Card */}
//         <div
//           className="card border-0 rounded-4 shadow-lg"
//           style={{
//             background: "rgba(255,255,255,0.05)",
//             backdropFilter: "blur(12px)",
//           }}
//         >
//           <div className="card-body p-4 p-md-5">

//             {/* Icon strip */}
//             <div className="d-flex justify-content-center gap-4 mb-4">
//               <div className="text-center">
//                 <div className="fs-4">📧</div>
//                 <div className="small" style={{ color: "#a89fc4" }}>Email</div>
//               </div>
//               <div className="text-center">
//                 <div className="fs-4">💬</div>
//                 <div className="small" style={{ color: "#a89fc4" }}>Chat</div>
//               </div>
//               <div className="text-center">
//                 <div className="fs-4">📞</div>
//                 <div className="small" style={{ color: "#a89fc4" }}>Call</div>
//               </div>
//             </div>

//             <hr style={{ border: "1px solid rgba(255,255,255,0.1)" }} className="mb-4" />

//             <form onSubmit={handleSubmit}>

//               {/* Name */}
//               <div className="mb-3">
//                 <label className="form-label fw-semibold text-white">Your Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   className="form-control rounded-3 border-0 text-white"
//                   style={{ background: "rgba(255,255,255,0.08)" }}
//                   placeholder="John Doe"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Email */}
//               <div className="mb-3">
//                 <label className="form-label fw-semibold text-white">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control rounded-3 border-0 text-white"
//                   style={{ background: "rgba(255,255,255,0.08)" }}
//                   placeholder="john@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Message */}
//               <div className="mb-4">
//                 <label className="form-label fw-semibold text-white">Message</label>
//                 <textarea
//                   name="message"
//                   className="form-control rounded-3 border-0 text-white"
//                   style={{ background: "rgba(255,255,255,0.08)" }}
//                   rows="5"
//                   placeholder="Write your message here..."
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 className="btn btn-primary w-100 rounded-3 py-2 fw-semibold"
//                 disabled={sending}
//               >
//                 {sending ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status" />
//                     Sending...
//                   </>
//                 ) : (
//                   "Send Message 🚀"
//                 )}
//               </button>

//             </form>
//           </div>
//         </div>

//         {/* Footer note */}
//         <p className="text-center mt-3 small" style={{ color: "#5a4a7a" }}>
//           We typically respond within 24 hours.
//         </p>

//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from "react";
import { sendContactMessage } from "../api/contact";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const floatAnim = {
  animate: {
    y: [0, -16, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

/* shared color tokens */
const gold   = "#e8b84b";
const dark   = "#030e1c";
const muted  = "#7a95b0";
const dimmer = "#4a6080";

const inputStyle = (focused) => ({
  background: focused ? "rgba(232,184,75,.03)" : "rgba(255,255,255,.04)",
  border: `1px solid ${focused ? "rgba(232,184,75,.4)" : "rgba(255,255,255,.09)"}`,
  borderRadius: 12,
  color: "#fff",
  fontSize: ".95rem",
  fontFamily: "'DM Sans', sans-serif",
  boxShadow: focused ? "0 0 0 3px rgba(232,184,75,.07)" : "none",
  outline: "none",
  transition: "all .2s",
});

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending,  setSending]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState(null);
  const [focused,  setFocused]  = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setSending(true);
      await sendContactMessage(formData);
      setFormData({ name: "", email: "", message: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const step1 = formData.name.length > 0;
  const step2 = formData.email.length > 0;
  const step3 = formData.message.length > 0;

  const steps = [
    { n: "1", lbl: "Name",    filled: step1 },
    { n: "2", lbl: "Email",   filled: step2 },
    { n: "3", lbl: "Message", filled: step3 },
  ];

  const infoItems = [
    { icon: "📧", label: "Email",         value: "hello@blogdairy.com" },
    { icon: "💬", label: "Response Time", value: "Within 24 hours" },
    { icon: "📍", label: "Location",      value: "India" },
  ];

  return (
    <section
      className="position-relative overflow-hidden"
      style={{
        minHeight: "100vh",
        padding: "120px 0 80px",
        background: `
          radial-gradient(ellipse 60% 50% at 90% 10%, rgba(232,184,75,.07) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 5% 90%,  rgba(37,99,235,.07)  0%, transparent 60%),
          linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)
        `,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-center gy-5">

          {/* ── LEFT SIDE ── */}
          <div className="col-lg-4 d-none d-lg-flex flex-column align-items-center">

            <motion.div variants={floatAnim} animate="animate" className="mb-4 text-center">
              <div style={{ fontSize: "5rem", lineHeight: 1 }}>✉️</div>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="text-center mb-4">
              <p style={{ fontSize: ".72rem", color: muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>
                We're here for you
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#fff", fontWeight: 700, lineHeight: 1.3 }}>
                Let's start a<br />
                <em style={{ color: gold }}>conversation</em>
              </p>
            </motion.div>

            {/* Info items */}
            <motion.div {...fadeUp(0.35)} className="w-100">
              {infoItems.map((item, i) => (
                <div
                  key={item.label}
                  className="d-flex align-items-center gap-3 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: "rgba(232,184,75,.1)",
                      border: "1px solid rgba(232,184,75,.2)",
                      fontSize: "1rem",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="mb-0" style={{ fontSize: ".65rem", color: dimmer, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                      {item.label}
                    </p>
                    <p className="mb-0" style={{ fontSize: ".88rem", color: "#c8d8e8", fontWeight: 500 }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── FORM CARD ── */}
          <div className="col-12 col-lg-7">
            <motion.div
              {...fadeUp(0)}
              className="position-relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 24,
                padding: "48px 44px",
                maxWidth: 680,
                margin: "0 auto",
              }}
            >
              {/* gold top line */}
              <div
                className="position-absolute top-0 start-0 end-0"
                style={{ height: 2, background: "linear-gradient(90deg, transparent, #e8b84b, transparent)" }}
              />

              {/* Header */}
              <div className="mb-4">
                <p
                  className="d-inline-flex align-items-center gap-2 mb-2"
                  style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: gold }}
                >
                  <span style={{ width: 26, height: 1, background: gold, display: "inline-block" }} />
                  Get in Touch
                </p>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 6 }}>
                  Send us a <em style={{ fontStyle: "italic", color: gold }}>Message</em>
                </h1>
                <p style={{ fontSize: ".9rem", color: muted, marginBottom: 0 }}>
                  Have a question or want to collaborate? We'd love to hear from you.
                </p>
              </div>

              {/* Step indicators */}
              <div className="d-flex align-items-center mb-4">
                {steps.map((st, i) => (
                  <div key={st.n} className="d-flex flex-column align-items-center gap-1 flex-fill position-relative">
                    {i < steps.length - 1 && (
                      <div
                        className="position-absolute"
                        style={{ top: 15, left: "60%", right: "-40%", height: 1, background: "rgba(255,255,255,.08)" }}
                      />
                    )}
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: 30, height: 30, borderRadius: "50%", zIndex: 1,
                        background: st.filled ? gold : "rgba(255,255,255,.05)",
                        border: `1px solid ${st.filled ? gold : "rgba(255,255,255,.1)"}`,
                        fontSize: ".72rem", fontWeight: 700,
                        color: st.filled ? dark : dimmer,
                        transition: "all .3s",
                      }}
                    >
                      {st.filled ? "✓" : st.n}
                    </div>
                    <span style={{ fontSize: ".62rem", color: st.filled ? gold : dimmer, letterSpacing: "1px", textTransform: "uppercase" }}>
                      {st.lbl}
                    </span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="mb-3">
                  <label className="d-block mb-2" style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: muted }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-100 px-3 py-3"
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    required
                    style={inputStyle(focused === "name")}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="d-block mb-2" style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: muted }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-100 px-3 py-3"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    required
                    style={inputStyle(focused === "email")}
                  />
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label className="d-block mb-2" style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: muted }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="w-100 px-3 py-3"
                    rows="6"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    required
                    style={{ ...inputStyle(focused === "message"), resize: "vertical", minHeight: 140 }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="w-100 border-0 fw-bold text-uppercase"
                  disabled={sending}
                  whileTap={{ scale: 0.98 }}
                  whileHover={!sending ? { backgroundColor: "#f5d98a", y: -2, boxShadow: "0 12px 30px rgba(232,184,75,.3)" } : {}}
                  style={{
                    background: gold,
                    color: dark,
                    fontSize: ".92rem",
                    letterSpacing: ".8px",
                    borderRadius: 50,
                    padding: 15,
                    cursor: sending ? "not-allowed" : "pointer",
                    opacity: sending ? 0.6 : 1,
                    boxShadow: "0 4px 20px rgba(232,184,75,.2)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {sending ? (
                    <span className="d-inline-flex align-items-center gap-2">
                      Sending
                      {[0, 0.16, 0.32].map((delay, i) => (
                        <motion.span
                          key={i}
                          style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: dark }}
                          animate={{ scale: [0.7, 1, 0.7], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay }}
                        />
                      ))}
                    </span>
                  ) : (
                    "✦ Send Message"
                  )}
                </motion.button>

              </form>

              {/* Feedback */}
              {error && (
                <div
                  className="mt-3 px-3 py-3 rounded-3"
                  style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", fontSize: ".85rem", color: "#fca5a5" }}
                >
                  ⚠ {error}
                </div>
              )}
              {success && (
                <div
                  className="mt-3 px-3 py-3 rounded-3 text-center"
                  style={{ background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.2)", fontSize: ".85rem", color: "#86efac" }}
                >
                  🎉 Message sent successfully! We'll get back to you soon.
                </div>
              )}

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;