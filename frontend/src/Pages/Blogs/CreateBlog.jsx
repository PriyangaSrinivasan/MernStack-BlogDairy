import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../Redux/slices/BlogSlice";
import img from "../../assets/images1.png";
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

const categories = [
  "Technology", "Lifestyle", "Travel",
  "Health", "Food", "Education", "Business",
];

const CreateBlog = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.blogs);
  const { token }          = useSelector((s) => s.auth);

  const [formData, setFormData] = useState({ title: "", content: "", image: null, category: "" });
  const [preview,  setPreview]  = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [focused,  setFocused]  = useState(null);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFile = (file) => {
    if (!file) return;
    setFormData((prev) => ({ ...prev, image: file }));
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

  const step1 = formData.title.length > 0;
  const step2 = formData.content.length > 0 && formData.category.length > 0;
  const step3 = formData.image !== null;

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "120px 0 80px",
        background: `
          radial-gradient(ellipse 60% 50% at 90% 10%, rgba(232,184,75,.07) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 5% 90%,  rgba(37,99,235,.07)  0%, transparent 60%),
          linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)
        `,
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>
      <div className="container">
        <div className="row align-items-center justify-content-center gy-5">

          {/* ── LEFT ILLUSTRATION ── */}
          <div className="col-lg-4 d-none d-lg-flex flex-column align-items-center">
            <motion.img
              src={img}
              alt="Create blog illustration"
              className="img-fluid"
              style={{ maxWidth: 320, opacity: 0.85, pointerEvents: "none", userSelect: "none" }}
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div {...fadeUp(0.3)} style={{ textAlign: "center", marginTop: 32 }}>
              <p style={{ fontSize: ".72rem", color: muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>
                Join the community
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#fff", fontWeight: 700, lineHeight: 1.3 }}>
                Share your story<br />
                <em style={{ color: gold }}>with the world</em>
              </p>
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
              }}>

              {/* Gold top line */}
              <div className="position-absolute top-0 start-0 end-0"
                style={{ height: 2, background: "linear-gradient(90deg, transparent, #e8b84b, transparent)" }} />

              {/* Header */}
              <div className="mb-4">
                <p className="d-inline-flex align-items-center gap-2 mb-2"
                  style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: gold }}>
                  <span style={{ width: 26, height: 1, background: gold, display: "inline-block" }} />
                  New Post
                </p>
                <h1 className="mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
                  Create a <em style={{ fontStyle: "italic", color: gold }}>Blog</em>
                </h1>
                <p style={{ fontSize: ".9rem", color: muted, marginBottom: 0 }}>
                  Share your ideas, stories, and expertise with our community.
                </p>
              </div>

              {/* Step indicators */}
              <div className="d-flex align-items-center mb-4">
                {[
                  { n: "1", lbl: "Title",   filled: step1 },
                  { n: "2", lbl: "Content", filled: step2 },
                  { n: "3", lbl: "Image",   filled: step3 },
                ].map((st, i) => (
                  <div key={st.n} className="d-flex flex-column align-items-center gap-1 flex-fill position-relative">
                    {i < 2 && (
                      <div className="position-absolute"
                        style={{ top: 15, left: "60%", right: "-40%", height: 1, background: "rgba(255,255,255,.08)" }} />
                    )}
                    <div className="d-flex align-items-center justify-content-center"
                      style={{
                        width: 30, height: 30, borderRadius: "50%", zIndex: 1,
                        background: st.filled ? gold : "rgba(255,255,255,.05)",
                        border: `1px solid ${st.filled ? gold : "rgba(255,255,255,.1)"}`,
                        fontSize: ".72rem", fontWeight: 700,
                        color: st.filled ? dark : dimmer,
                        transition: "all .3s",
                      }}>
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

                {/* Title */}
                <div className="mb-3">
                  <label className="d-block mb-2"
                    style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: muted }}>
                    Blog Title
                  </label>
                  <input type="text" name="title" placeholder="Enter your blog title..."
                    value={formData.title} onChange={handleChange} required
                    style={inputStyle("title")}
                    onFocus={() => setFocused("title")} onBlur={() => setFocused(null)} />
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="d-block mb-2"
                    style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: muted }}>
                    Category
                  </label>
                  <select name="category" value={formData.category} onChange={handleChange} required
                    style={{ ...inputStyle("category"), appearance: "auto" }}
                    onFocus={() => setFocused("category")} onBlur={() => setFocused(null)}>
                    <option value="" style={{ background: "#041428" }}>Select a category...</option>
                    {categories.map((c) => (
                      <option key={c} value={c} style={{ background: "#041428" }}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label className="d-block mb-2"
                    style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: muted }}>
                    Content
                  </label>
                  <textarea name="content" rows="6" placeholder="Write your blog content here..."
                    value={formData.content} onChange={handleChange} required
                    style={{ ...inputStyle("content"), resize: "vertical", minHeight: 140 }}
                    onFocus={() => setFocused("content")} onBlur={() => setFocused(null)} />
                </div>

                {/* File upload zone */}
                <div className="mb-4">
                  <label className="d-block mb-2"
                    style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: muted }}>
                    Cover Image
                  </label>
                  <div className="text-center position-relative"
                    style={{
                      border: `1.5px dashed ${dragOver ? "rgba(232,184,75,.5)" : "rgba(255,255,255,.12)"}`,
                      borderRadius: 14, padding: "28px 20px", cursor: "pointer",
                      background: dragOver ? "rgba(232,184,75,.04)" : "rgba(255,255,255,.02)",
                      transition: "border-color .25s, background .25s",
                    }}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}>
                    <input type="file" accept="image/*"
                      onChange={(e) => handleFile(e.target.files[0])}
                      style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }} />
                    <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>🖼️</div>
                    <p className="mb-1" style={{ fontSize: ".85rem", color: muted }}>
                      Drag & drop your image or <span style={{ color: gold, fontWeight: 600 }}>browse</span>
                    </p>
                    <p className="mb-0" style={{ fontSize: ".72rem", color: dimmer }}>PNG, JPG, WEBP up to 10MB</p>
                    {formData.image && (
                      <p className="mt-2 mb-0" style={{ fontSize: ".8rem", color: gold, fontWeight: 600, letterSpacing: ".5px" }}>
                        ✓ {formData.image.name}
                      </p>
                    )}
                  </div>
                  {preview && (
                    <img src={preview} alt="preview" className="w-100 mt-3"
                      style={{ maxHeight: 200, objectFit: "cover", borderRadius: 12, border: "1px solid rgba(232,184,75,.2)" }} />
                  )}
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  className="w-100 border-0 fw-bold text-uppercase"
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
                      Publishing
                      {[0, 0.16, 0.32].map((delay, i) => (
                        <motion.span key={i}
                          style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: dark }}
                          animate={{ scale: [0.7, 1, 0.7], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay }} />
                      ))}
                    </span>
                  ) : "✦ Publish Blog"}
                </motion.button>

              </form>

              {/* Feedback */}
              {error && (
                <div className="mt-3 px-3 py-3 rounded-3"
                  style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", fontSize: ".85rem", color: "#fca5a5" }}>
                  ⚠ {error}
                </div>
              )}
              {success && (
                <div className="mt-3 px-3 py-3 rounded-3 text-center"
                  style={{ background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.2)", fontSize: ".85rem", color: "#86efac" }}>
                  🎉 Blog published successfully!
                </div>
              )}

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CreateBlog;