
// src/Pages/CreateBlog.jsx
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../Redux/slices/BlogSlice";
// import img from "../../assets/1771499049352_image.png";
import img from "../../assets/images1.png";
import { motion } from "framer-motion";

/* ─── inject styles once ─── */
const css = `
  .bd-create {
    min-height: 100vh;
    padding: 120px 0 80px;
    background:
      radial-gradient(ellipse 60% 50% at 90% 10%, rgba(232,184,75,.07) 0%, transparent 60%),
      radial-gradient(ellipse 50% 60% at 5% 90%,  rgba(37,99,235,.07)  0%, transparent 60%),
      linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%);
    font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
  }

  /* ── FORM CARD ── */
  .bd-create-card {
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 24px;
    padding: 48px 44px;
    position: relative; overflow: hidden;
    max-width: 680px; margin: 0 auto;
  }
  .bd-create-card::before {
    content: ''; position: absolute; top:0; left:0; right:0; height:2px;
    background: linear-gradient(90deg, transparent, #e8b84b, transparent);
  }

  /* ── PAGE HEADER ── */
  .bd-create-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: .7rem; font-weight: 600; letter-spacing: 2.5px;
    text-transform: uppercase; color: #e8b84b; margin-bottom: 10px;
  }
  .bd-create-eyebrow::before { content:''; width:26px; height:1px; background:#e8b84b; }
  .bd-create-h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 900; color: #fff; line-height: 1.1;
    letter-spacing: -0.5px; margin-bottom: 6px;
  }
  .bd-create-h1 em { font-style: italic; color: #e8b84b; }
  .bd-create-sub { font-size: .9rem; color: #7a95b0; margin-bottom: 0; }

  /* ── FORM LABELS ── */
  .bd-label {
    font-size: .72rem; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: #7a95b0; margin-bottom: 8px;
    display: block;
  }

  /* ── INPUTS ── */
  .bd-input {
    width: 100%;
    background: rgba(255,255,255,.04) !important;
    border: 1px solid rgba(255,255,255,.09) !important;
    border-radius: 12px !important;
    color: #fff !important;
    font-size: .95rem !important;
    padding: 13px 18px !important;
    transition: border-color .2s, background .2s !important;
    outline: none !important;
    font-family: 'DM Sans', sans-serif !important;
  }
  .bd-input::placeholder { color: #4a6080 !important; }
  .bd-input:focus {
    border-color: rgba(232,184,75,.4) !important;
    background: rgba(232,184,75,.03) !important;
    box-shadow: 0 0 0 3px rgba(232,184,75,.07) !important;
  }
  .bd-input option {
    background: #041428 !important; color: #fff !important;
  }

  /* ── FILE UPLOAD ZONE ── */
  .bd-file-zone {
    border: 1.5px dashed rgba(255,255,255,.12);
    border-radius: 14px;
    padding: 28px 20px;
    text-align: center;
    cursor: pointer;
    transition: border-color .25s, background .25s;
    background: rgba(255,255,255,.02);
    position: relative;
  }
  .bd-file-zone:hover, .bd-file-zone.active {
    border-color: rgba(232,184,75,.4);
    background: rgba(232,184,75,.04);
  }
  .bd-file-zone input[type="file"] {
    position: absolute; inset: 0; opacity: 0; cursor: pointer; width:100%; height:100%;
  }
  .bd-file-icon { font-size: 1.8rem; margin-bottom: 8px; }
  .bd-file-label { font-size: .85rem; color: #7a95b0; }
  .bd-file-label span { color: #e8b84b; font-weight: 600; }
  .bd-file-name {
    margin-top: 10px; font-size: .8rem; color: #e8b84b;
    font-weight: 600; letter-spacing: .5px;
  }

  /* ── PREVIEW IMAGE ── */
  .bd-preview {
    width: 100%; max-height: 200px; object-fit: cover;
    border-radius: 12px; margin-top: 12px;
    border: 1px solid rgba(232,184,75,.2);
  }

  /* ── SUBMIT BTN ── */
  .bd-btn-submit {
    width: 100%; background: #e8b84b; color: #030e1c;
    font-weight: 800; font-size: .92rem; letter-spacing: .8px;
    text-transform: uppercase; border: none; border-radius: 50px;
    padding: 15px; cursor: pointer;
    transition: background .2s, transform .15s, box-shadow .2s;
    box-shadow: 0 4px 20px rgba(232,184,75,.2);
  }
  .bd-btn-submit:hover:not(:disabled) {
    background: #f5d98a; transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(232,184,75,.3);
  }
  .bd-btn-submit:disabled { opacity: .6; cursor: not-allowed; }

  /* loading dots */
  .bd-dots span {
    display: inline-block; width:6px; height:6px; border-radius:50%;
    background: #030e1c; margin: 0 2px;
    animation: bd-dot-bounce .8s infinite ease-in-out both;
  }
  .bd-dots span:nth-child(2) { animation-delay: .16s; }
  .bd-dots span:nth-child(3) { animation-delay: .32s; }
  @keyframes bd-dot-bounce {
    0%,80%,100% { transform: scale(0.7); opacity:.5; }
    40%          { transform: scale(1);   opacity:1; }
  }

  /* ── ERROR ── */
  .bd-error {
    background: rgba(239,68,68,.08);
    border: 1px solid rgba(239,68,68,.2);
    border-radius: 10px; padding: 12px 16px;
    font-size: .85rem; color: #fca5a5;
    margin-top: 16px;
  }

  /* ── SUCCESS ── */
  .bd-success {
    background: rgba(34,197,94,.08);
    border: 1px solid rgba(34,197,94,.2);
    border-radius: 10px; padding: 12px 16px;
    font-size: .85rem; color: #86efac;
    margin-top: 16px; text-align: center;
  }

  /* ── SIDE ILLUSTRATION ── */
  .bd-create-illustration {
    pointer-events: none; user-select: none;
    max-width: 320px;
  }

  /* ── STEP INDICATORS ── */
  .bd-steps {
    display: flex; align-items: center; gap: 0; margin-bottom: 36px;
  }
  .bd-step {
    display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1;
    position: relative;
  }
  .bd-step:not(:last-child)::after {
    content: ''; position: absolute; top: 15px; left: 60%; right: -40%;
    height: 1px; background: rgba(255,255,255,.08);
  }
  .bd-step-dot {
    width: 30px; height: 30px; border-radius: 50%;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.1);
    display: flex; align-items: center; justify-content: center;
    font-size: .72rem; font-weight: 700; color: #4a6080;
    transition: all .3s; z-index: 1;
  }
  .bd-step-dot.filled {
    background: #e8b84b; border-color: #e8b84b; color: #030e1c;
  }
  .bd-step-lbl {
    font-size: .62rem; color: #4a6080; letter-spacing: 1px; text-transform: uppercase;
    text-align: center;
  }
  .bd-step-lbl.filled { color: #e8b84b; }
`;

if (!document.getElementById("bd-create-styles")) {
  const s = document.createElement("style");
  s.id = "bd-create-styles";
  s.textContent = css;
  document.head.appendChild(s);
}

/* ─── animation ─── */
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

const categories = [
  "Technology", "Lifestyle", "Travel",
  "Health", "Food", "Education", "Business",
];


const CreateBlog = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.blogs);
  const { token }          = useSelector((s) => s.auth);
  const fileRef            = useRef(null);

  const [formData, setFormData] = useState({
    title: "", content: "", image: null, category: "",
  });
  const [preview,  setPreview]  = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [success,  setSuccess]  = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please login first!");

    const fd = new FormData();
    fd.append("title",    formData.title);
    fd.append("content",  formData.content);
    fd.append("category", formData.category);
    if (formData.image) fd.append("image", formData.image);

    try {
      await dispatch(createBlog(fd)).unwrap();
      setFormData({ title: "", content: "", image: null, category: "" });
      setPreview(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error("Blog creation error:", err);
    }
  };

  /* step progress */
  const step1 = formData.title.length > 0;
  const step2 = formData.content.length > 0 && formData.category.length > 0;
  const step3 = formData.image !== null;

  return (
    <section className="bd-create">
      <div className="container">
        <div className="row align-items-center justify-content-center gy-5">

          <div className="col-lg-4 d-none d-lg-flex flex-column align-items-center">
            <motion.img
              src={img}
              alt="Create blog illustration"
              className="bd-create-illustration img-fluid"
              variants={floatAnim}
              animate="animate"
              style={{ opacity: .85 }}
            />
            <motion.div {...fadeUp(0.3)} style={{ textAlign: "center", marginTop: 32 }}>
              <p style={{ fontSize: ".72rem", color: "#7a95b0", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>
                Join the community
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#fff", fontWeight: 700, lineHeight: 1.3 }}>
                Share your story<br /><em style={{ color: "#e8b84b" }}>with the world</em>
              </p>
            </motion.div>
          </div>

          {/* ── FORM CARD ── */}
          <div className="col-12 col-lg-7">
            <motion.div className="bd-create-card" {...fadeUp(0)}>

              {/* header */}
              <div className="mb-4">
                <p className="bd-create-eyebrow">New Post</p>
                <h1 className="bd-create-h1">Create a <em>Blog</em></h1>
                <p className="bd-create-sub">Share your ideas, stories, and expertise with our community.</p>
              </div>

            
              <div className="bd-steps">
                {[
                  { n: "1", lbl: "Title",   filled: step1 },
                  { n: "2", lbl: "Content", filled: step2 },
                  { n: "3", lbl: "Image",   filled: step3 },
                ].map((st) => (
                  <div key={st.n} className="bd-step">
                    <div className={`bd-step-dot ${st.filled ? "filled" : ""}`}>{st.filled ? "✓" : st.n}</div>
                    <span className={`bd-step-lbl ${st.filled ? "filled" : ""}`}>{st.lbl}</span>
                  </div>
                ))}
              </div>

              {/* form */}
              <form onSubmit={handleSubmit}>

                {/* Title */}
                <div className="mb-3">
                  <label className="bd-label">Blog Title</label>
                  <input
                    type="text"
                    name="title"
                    className="bd-input"
                    placeholder="Enter your blog title..."
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="bd-label">Category</label>
                  <select
                    name="category"
                    className="bd-input"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category...</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label className="bd-label">Content</label>
                  <textarea
                    name="content"
                    className="bd-input"
                    rows="6"
                    placeholder="Write your blog content here..."
                    value={formData.content}
                    onChange={handleChange}
                    required
                    style={{ resize: "vertical", minHeight: 140 }}
                  />
                </div>

                {/* File upload */}
                <div className="mb-4">
                  <label className="bd-label">Cover Image</label>
                  <div
                    className={`bd-file-zone ${dragOver ? "active" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault(); setDragOver(false);
                      const file = e.dataTransfer.files[0];
                      if (file) { setFormData({ ...formData, image: file }); setPreview(URL.createObjectURL(file)); }
                    }}
                  >
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <div className="bd-file-icon">🖼️</div>
                    <p className="bd-file-label mb-0">
                      Drag & drop your image or <span>browse</span>
                    </p>
                    <p style={{ fontSize: ".72rem", color: "#4a6080", marginTop: 4, marginBottom: 0 }}>
                      PNG, JPG, WEBP up to 10MB
                    </p>
                    {formData.image && (
                      <p className="bd-file-name">✓ {formData.image.name}</p>
                    )}
                  </div>
                  {preview && (
                    <img src={preview} alt="preview" className="bd-preview" />
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="bd-btn-submit"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <span className="bd-dots">
                      Publishing<span /><span /><span />
                    </span>
                  ) : (
                    "✦ Publish Blog"
                  )}
                </motion.button>

              </form>

              {/* feedback */}
              {error   && <div className="bd-error">⚠ {error}</div>}
              {success && <div className="bd-success">🎉 Blog published successfully!</div>}

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CreateBlog;