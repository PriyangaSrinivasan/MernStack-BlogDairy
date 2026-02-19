
import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const res = await axios.post(
        "https://mernstack-blogdairy.onrender.com/api/contact",
        formData
      );
      alert(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Message failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
    >
      <div className="container" style={{ maxWidth: "560px" }}>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-white mb-1">📩 Contact Us</h2>
          <p className="small" style={{ color: "#a89fc4" }}>
            We'd love to hear from you. Send us a message and we'll respond shortly.
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

            {/* Icon strip */}
            <div className="d-flex justify-content-center gap-4 mb-4">
              <div className="text-center">
                <div className="fs-4">📧</div>
                <div className="small" style={{ color: "#a89fc4" }}>Email</div>
              </div>
              <div className="text-center">
                <div className="fs-4">💬</div>
                <div className="small" style={{ color: "#a89fc4" }}>Chat</div>
              </div>
              <div className="text-center">
                <div className="fs-4">📞</div>
                <div className="small" style={{ color: "#a89fc4" }}>Call</div>
              </div>
            </div>

            <hr style={{ border: "1px solid rgba(255,255,255,0.1)" }} className="mb-4" />

            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-white">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control rounded-3 border-0 text-white"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-white">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control rounded-3 border-0 text-white"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message */}
              <div className="mb-4">
                <label className="form-label fw-semibold text-white">Message</label>
                <textarea
                  name="message"
                  className="form-control rounded-3 border-0 text-white"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  rows="5"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-3 py-2 fw-semibold"
                disabled={sending}
              >
                {sending ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Sending...
                  </>
                ) : (
                  "Send Message 🚀"
                )}
              </button>

            </form>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center mt-3 small" style={{ color: "#5a4a7a" }}>
          We typically respond within 24 hours.
        </p>

      </div>
    </div>
  );
};

export default Contact;