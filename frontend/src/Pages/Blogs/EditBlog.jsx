
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBlogById, updateBlog } from "../../Redux/slices/BlogSlice";

// const EditBlog = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { singleBlog, loading, error } = useSelector((state) => state.blogs);
//   const { user, token } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     category: "",
//     image: null,
//   });

//   const [previewImage, setPreviewImage] = useState("");
//   const [updating, setUpdating] = useState(false);

//   useEffect(() => {
//     dispatch(fetchBlogById(id));
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (singleBlog) {
//       setFormData({
//         title: singleBlog.title || "",
//         content: singleBlog.content || "",
//         category: singleBlog.category || "",
//         image: null,
//       });
//       setPreviewImage(singleBlog.image || "");
//     }
//   }, [singleBlog]);

//   useEffect(() => {
//     if (!user || !singleBlog) return;
//     const authorId = singleBlog.author?._id || singleBlog.author;
//     if (user.role !== "admin" && String(user._id) !== String(authorId)) {
//       alert("You are not authorized to edit this blog.");
//       navigate("/blogs");
//     }
//   }, [singleBlog, user, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prev) => ({ ...prev, image: file }));
//     if (file) setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) return alert("You must be logged in to edit a blog.");
//     try {
//       setUpdating(true);
//       const fd = new FormData();
//       fd.append("title", formData.title);
//       fd.append("content", formData.content);
//       fd.append("category", formData.category);
//       if (formData.image) fd.append("image", formData.image);
//       await dispatch(updateBlog({ id, blogData: fd })).unwrap();
//       alert("Blog updated successfully!");
//       navigate(`/blogs/${id}`);
//     } catch (err) {
//       alert(err || "Failed to update blog");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading)
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center vh-100"
//         style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
//       >
//         <div className="text-center">
//           <div className="spinner-border" style={{ width: "3rem", height: "3rem", color: "#a080ff" }} role="status" />
//           <p className="mt-3" style={{ color: "#a89fc4" }}>Loading blog...</p>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div
//         className="min-vh-100 py-5"
//         style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
//       >
//         <div className="container" style={{ maxWidth: "680px" }}>
//           <div className="alert alert-danger text-center rounded-3">{error}</div>
//         </div>
//       </div>
//     );

//   return (
//     <div
//       className="min-vh-100 py-5"
//       style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
//     >
//       <div className="container" style={{ maxWidth: "680px" }}>

//         {/* Back button */}
//         <button
//           className="btn btn-outline-light btn-sm mb-4"
//           onClick={() => navigate(`/blogs/${id}`)}
//         >
//           ← Back to Blog
//         </button>

//         {/* Card */}
//         <div
//           className="card shadow-lg border-0 rounded-4"
//           style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}
//         >
//           <div className="card-body p-4 p-md-5">

//             {/* Header */}
//             <h2 className="card-title text-center fw-bold mb-1 text-white">✏️ Edit Blog</h2>
//             <p className="text-center small mb-4" style={{ color: "#a89fc4" }}>Update your story below</p>
//             <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} className="mb-4" />

//             <form onSubmit={handleSubmit}>

//               {/* Title */}
//               <div className="mb-3">
//                 <label className="form-label fw-semibold text-white">Blog Title</label>
//                 <input
//                   type="text"
//                   className="form-control form-control-lg rounded-3 text-white border-0"
//                   style={{ background: "rgba(255,255,255,0.08)" }}
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   placeholder="Enter a compelling title..."
//                   required
//                 />
//               </div>

//               {/* Category */}
//               <div className="mb-3">
//                 <label className="form-label fw-semibold text-white">Category</label>
//                 <input
//                   type="text"
//                   className="form-control rounded-3 text-white border-0"
//                   style={{ background: "rgba(255,255,255,0.08)" }}
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   placeholder="e.g. Technology, Travel, Food..."
//                 />
//               </div>

//               {/* Content */}
//               <div className="mb-3">
//                 <label className="form-label fw-semibold text-white">Content</label>
//                 <textarea
//                   className="form-control rounded-3 text-white border-0"
//                   style={{ background: "rgba(255,255,255,0.08)" }}
//                   name="content"
//                   rows="7"
//                   value={formData.content}
//                   onChange={handleChange}
//                   placeholder="Tell your story..."
//                   required
//                 />
//               </div>

//               {/* Image upload */}
//               <div className="mb-3">
//                 <label className="form-label fw-semibold text-white">Cover Image</label>
//                 <input
//                   type="file"
//                   className="form-control rounded-3 text-white border-0"
//                   style={{ background: "rgba(255,255,255,0.08)" }}
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//                 <div className="form-text" style={{ color: "#7a6a9a" }}>Leave empty to keep the existing image.</div>
//               </div>

//               {/* Image preview */}
//               {previewImage && (
//                 <div className="mb-4">
//                   <label className="form-label fw-semibold small" style={{ color: "#a89fc4" }}>Preview</label>
//                   <img
//                     src={previewImage}
//                     alt="Preview"
//                     className="img-fluid rounded-3 w-100"
//                     style={{ maxHeight: "280px", objectFit: "cover" }}
//                   />
//                 </div>
//               )}

//               {/* Action buttons */}
//               <div className="d-flex gap-3 justify-content-center mt-4">
//                 <button
//                   type="submit"
//                   className="btn btn-primary px-4 py-2 rounded-3 fw-semibold"
//                   disabled={updating}
//                 >
//                   {updating ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" role="status" />
//                       Updating...
//                     </>
//                   ) : (
//                     "💾 Save Changes"
//                   )}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-outline-light px-4 py-2 rounded-3"
//                   onClick={() => navigate(`/blogs/${id}`)}
//                 >
//                   🔙 Cancel
//                 </button>
//               </div>

//             </form>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default EditBlog;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, updateBlog } from "../../Redux/slices/BlogSlice";
import { Container, Spinner } from "react-bootstrap";
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

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleBlog, loading, error } = useSelector((s) => s.blogs);
  const { user, token } = useSelector((s) => s.auth);

  const [formData, setFormData] = useState({ title: "", content: "", category: "", image: null });
  const [previewImage, setPreviewImage] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState(null);

  useEffect(() => { dispatch(fetchBlogById(id)); }, [dispatch, id]);

  useEffect(() => {
    if (singleBlog) {
      setFormData({ title: singleBlog.title || "", content: singleBlog.content || "", category: singleBlog.category || "", image: null });
      setPreviewImage(singleBlog.image || "");
    }
  }, [singleBlog]);

  useEffect(() => {
    if (!user || !singleBlog) return;
    const authorId = singleBlog.author?._id || singleBlog.author;
    if (user.role !== "admin" && String(user._id) !== String(authorId)) {
      alert("You are not authorized to edit this blog.");
      navigate("/blogs");
    }
  }, [singleBlog, user, navigate]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (file) => {
    if (!file) return;
    setFormData((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("You must be logged in.");
    try {
      setUpdating(true);
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("content", formData.content);
      fd.append("category", formData.category);
      if (formData.image) fd.append("image", formData.image);
      await dispatch(updateBlog({ id, blogData: fd })).unwrap();
      setSuccess(true);
      setTimeout(() => navigate(`/blogs/${id}`), 1500);
    } catch (err) {
      alert(err || "Failed to update blog");
    } finally {
      setUpdating(false);
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
  });

  /* ── Loading ── */
  if (loading) return (
    <div className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: "linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)" }}>
      <div className="text-center">
        <Spinner animation="border" style={{ color: gold, width: "3rem", height: "3rem" }} />
        <p style={{ color: muted, marginTop: "1rem", fontFamily: "'DM Sans', sans-serif" }}>Loading blog...</p>
      </div>
    </div>
  );

  /* ── Error ── */
  if (error) return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)" }}>
      <div className="px-4 py-3 rounded-3"
        style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", color: "#fca5a5", fontFamily: "'DM Sans', sans-serif" }}>
        ⚠ {error}
      </div>
    </div>
  );

  /* ── step progress ── */
  const step1 = formData.title.length > 0;
  const step2 = formData.content.length > 0 && formData.category.length > 0;
  const step3 = !!previewImage;

  return (
    <div className="position-relative overflow-hidden"
      style={{
        minHeight: "100vh",
        padding: "100px 0 80px",
        background: `
          radial-gradient(ellipse 60% 50% at 90% 10%, rgba(232,184,75,.07) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 5% 90%,  rgba(37,99,235,.07)  0%, transparent 60%),
          linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)
        `,
        fontFamily: "'DM Sans', sans-serif",
      }}>
      <Container style={{ maxWidth: 720 }}>

        {/* Back button */}
        <motion.button
          {...fadeUp(0)}
          onClick={() => navigate(`/blogs/${id}`)}
          className="mb-4 d-inline-flex align-items-center gap-2"
          style={{ background: "transparent", border: "1px solid rgba(232,184,75,.3)", color: gold, borderRadius: 8, padding: "7px 18px", fontSize: ".82rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: ".06em", cursor: "pointer" }}
          whileHover={{ background: "rgba(232,184,75,.08)" }}>
          ← Back to Blog
        </motion.button>

        {/* Form card */}
        <motion.div {...fadeUp(0.1)} className="position-relative overflow-hidden"
          style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 24, padding: "48px 44px", maxWidth: 720, margin: "0 auto" }}>

          {/* Gold top line */}
          <div className="position-absolute top-0 start-0 end-0"
            style={{ height: 2, background: "linear-gradient(90deg, transparent, #e8b84b, transparent)" }} />

          {/* Header */}
          <div className="mb-4">
            <p className="d-inline-flex align-items-center gap-2 mb-2"
              style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: gold }}>
              <span style={{ width: 26, height: 1, background: gold, display: "inline-block" }} />
              Edit Post
            </p>
            <h1 className="mb-1"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
              Update your <em style={{ fontStyle: "italic", color: gold }}>Blog</em>
            </h1>
            <p style={{ fontSize: ".9rem", color: muted, marginBottom: 0 }}>
              Refine your story and publish your changes.
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
              <input type="text" name="title" placeholder="Enter a compelling title..."
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
              <textarea name="content" rows="6" placeholder="Tell your story..."
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
              <div
                className="text-center position-relative"
                style={{
                  border: `1.5px dashed ${dragOver ? "rgba(232,184,75,.5)" : "rgba(255,255,255,.12)"}`,
                  borderRadius: 14,
                  padding: "28px 20px",
                  cursor: "pointer",
                  background: dragOver ? "rgba(232,184,75,.04)" : "rgba(255,255,255,.02)",
                  transition: "all .25s",
                }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileChange(e.dataTransfer.files[0]); }}>
                <input type="file" accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }} />
                <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>🖼️</div>
                <p className="mb-1" style={{ fontSize: ".85rem", color: muted }}>
                  Drag & drop or <span style={{ color: gold, fontWeight: 600 }}>browse</span>
                </p>
                <p className="mb-0" style={{ fontSize: ".72rem", color: dimmer }}>PNG, JPG, WEBP up to 10MB</p>
                {formData.image && (
                  <p className="mt-2 mb-0" style={{ fontSize: ".8rem", color: gold, fontWeight: 600 }}>✓ {formData.image.name}</p>
                )}
                {!formData.image && previewImage && (
                  <p className="mt-2 mb-0" style={{ fontSize: ".8rem", color: dimmer }}>Leave empty to keep existing image</p>
                )}
              </div>

              {/* Preview */}
              {previewImage && (
                <img src={previewImage} alt="preview" className="w-100 mt-3"
                  style={{ maxHeight: 200, objectFit: "cover", borderRadius: 12, border: "1px solid rgba(232,184,75,.2)" }} />
              )}
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3">
              <motion.button
                type="submit"
                className="flex-fill border-0 fw-bold text-uppercase"
                disabled={updating}
                whileTap={{ scale: 0.98 }}
                whileHover={!updating ? { backgroundColor: "#f5d98a", y: -2, boxShadow: "0 12px 30px rgba(232,184,75,.3)" } : {}}
                style={{
                  background: gold, color: dark, fontSize: ".92rem", letterSpacing: ".8px",
                  borderRadius: 50, padding: 15, cursor: updating ? "not-allowed" : "pointer",
                  opacity: updating ? 0.6 : 1, boxShadow: "0 4px 20px rgba(232,184,75,.2)",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                {updating ? (
                  <span className="d-inline-flex align-items-center gap-2 justify-content-center">
                    Updating
                    {[0, 0.16, 0.32].map((delay, i) => (
                      <motion.span key={i}
                        style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: dark }}
                        animate={{ scale: [0.7, 1, 0.7], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay }} />
                    ))}
                  </span>
                ) : "💾 Save Changes"}
              </motion.button>

              <motion.button
                type="button"
                onClick={() => navigate(`/blogs/${id}`)}
                whileTap={{ scale: 0.98 }}
                whileHover={{ background: "rgba(255,255,255,.08)" }}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,.15)",
                  color: muted, fontSize: ".88rem",
                  borderRadius: 50, padding: "15px 28px",
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: ".05em",
                }}>
                Cancel
              </motion.button>
            </div>

          </form>

          {/* Success banner */}
          {success && (
            <div className="mt-3 px-3 py-3 rounded-3 text-center"
              style={{ background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.2)", fontSize: ".85rem", color: "#86efac" }}>
              🎉 Blog updated! Redirecting...
            </div>
          )}

        </motion.div>
      </Container>
    </div>
  );
};

export default EditBlog;