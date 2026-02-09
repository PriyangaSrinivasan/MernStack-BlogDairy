import React, { useState } from "react";
import axios from "axios";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );
      alert(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Message failed");
    }
  };

  return (
    <div
      className="contact d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
      

      }}
    >
      <div className="card contact-card shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <h3 className="text-center mb-4 fw-bold">📩 Contact Us</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              className="form-control"
              rows="4"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary w-100">
            Send Message 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
