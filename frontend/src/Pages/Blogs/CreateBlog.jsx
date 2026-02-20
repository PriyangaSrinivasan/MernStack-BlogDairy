
// // src/Pages/CreateBlog.jsx
// import React, { useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createBlog } from "../../Redux/slices/BlogSlice";
// // import img from "../../assets/1771499049352_image.png";
// import img from "../../assets/images1.png";
// import { motion } from "framer-motion";

// /* ─── inject styles once ─── */
// const css = `
//   .bd-create {
//     min-height: 100vh;
//     padding: 120px 0 80px;
//     background:
//       radial-gradient(ellipse 60% 50% at 90% 10%, rgba(232,184,75,.07) 0%, transparent 60%),
//       radial-gradient(ellipse 50% 60% at 5% 90%,  rgba(37,99,235,.07)  0%, transparent 60%),
//       linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%);
//     font-family: 'DM Sans', sans-serif;
//     position: relative; overflow: hidden;
//   }

//   /* ── FORM CARD ── */
//   .bd-create-card {
//     background: rgba(255,255,255,.03);
//     border: 1px solid rgba(255,255,255,.08);
//     border-radius: 24px;
//     padding: 48px 44px;
//     position: relative; overflow: hidden;
//     max-width: 680px; margin: 0 auto;
//   }
//   .bd-create-card::before {
//     content: ''; position: absolute; top:0; left:0; right:0; height:2px;
//     background: linear-gradient(90deg, transparent, #e8b84b, transparent);
//   }

//   /* ── PAGE HEADER ── */
//   .bd-create-eyebrow {
//     display: inline-flex; align-items: center; gap: 10px;
//     font-size: .7rem; font-weight: 600; letter-spacing: 2.5px;
//     text-transform: uppercase; color: #e8b84b; margin-bottom: 10px;
//   }
//   .bd-create-eyebrow::before { content:''; width:26px; height:1px; background:#e8b84b; }
//   .bd-create-h1 {
//     font-family: 'Playfair Display', serif;
//     font-size: clamp(1.8rem, 3vw, 2.6rem);
//     font-weight: 900; color: #fff; line-height: 1.1;
//     letter-spacing: -0.5px; margin-bottom: 6px;
//   }
//   .bd-create-h1 em { font-style: italic; color: #e8b84b; }
//   .bd-create-sub { font-size: .9rem; color: #7a95b0; margin-bottom: 0; }

//   /* ── FORM LABELS ── */
//   .bd-label {
//     font-size: .72rem; font-weight: 700; letter-spacing: 1.5px;
//     text-transform: uppercase; color: #7a95b0; margin-bottom: 8px;
//     display: block;
//   }

//   /* ── INPUTS ── */
//   .bd-input {
//     width: 100%;
//     background: rgba(255,255,255,.04) !important;
//     border: 1px solid rgba(255,255,255,.09) !important;
//     border-radius: 12px !important;
//     color: #fff !important;
//     font-size: .95rem !important;
//     padding: 13px 18px !important;
//     transition: border-color .2s, background .2s !important;
//     outline: none !important;
//     font-family: 'DM Sans', sans-serif !important;
//   }
//   .bd-input::placeholder { color: #4a6080 !important; }
//   .bd-input:focus {
//     border-color: rgba(232,184,75,.4) !important;
//     background: rgba(232,184,75,.03) !important;
//     box-shadow: 0 0 0 3px rgba(232,184,75,.07) !important;
//   }
//   .bd-input option {
//     background: #041428 !important; color: #fff !important;
//   }

//   /* ── FILE UPLOAD ZONE ── */
//   .bd-file-zone {
//     border: 1.5px dashed rgba(255,255,255,.12);
//     border-radius: 14px;
//     padding: 28px 20px;
//     text-align: center;
//     cursor: pointer;
//     transition: border-color .25s, background .25s;
//     background: rgba(255,255,255,.02);
//     position: relative;
//   }
//   .bd-file-zone:hover, .bd-file-zone.active {
//     border-color: rgba(232,184,75,.4);
//     background: rgba(232,184,75,.04);
//   }
//   .bd-file-zone input[type="file"] {
//     position: absolute; inset: 0; opacity: 0; cursor: pointer; width:100%; height:100%;
//   }
//   .bd-file-icon { font-size: 1.8rem; margin-bottom: 8px; }
//   .bd-file-label { font-size: .85rem; color: #7a95b0; }
//   .bd-file-label span { color: #e8b84b; font-weight: 600; }
//   .bd-file-name {
//     margin-top: 10px; font-size: .8rem; color: #e8b84b;
//     font-weight: 600; letter-spacing: .5px;
//   }

//   /* ── PREVIEW IMAGE ── */
//   .bd-preview {
//     width: 100%; max-height: 200px; object-fit: cover;
//     border-radius: 12px; margin-top: 12px;
//     border: 1px solid rgba(232,184,75,.2);
//   }

//   /* ── SUBMIT BTN ── */
//   .bd-btn-submit {
//     width: 100%; background: #e8b84b; color: #030e1c;
//     font-weight: 800; font-size: .92rem; letter-spacing: .8px;
//     text-transform: uppercase; border: none; border-radius: 50px;
//     padding: 15px; cursor: pointer;
//     transition: background .2s, transform .15s, box-shadow .2s;
//     box-shadow: 0 4px 20px rgba(232,184,75,.2);
//   }
//   .bd-btn-submit:hover:not(:disabled) {
//     background: #f5d98a; transform: translateY(-2px);
//     box-shadow: 0 12px 30px rgba(232,184,75,.3);
//   }
//   .bd-btn-submit:disabled { opacity: .6; cursor: not-allowed; }

//   /* loading dots */
//   .bd-dots span {
//     display: inline-block; width:6px; height:6px; border-radius:50%;
//     background: #030e1c; margin: 0 2px;
//     animation: bd-dot-bounce .8s infinite ease-in-out both;
//   }
//   .bd-dots span:nth-child(2) { animation-delay: .16s; }
//   .bd-dots span:nth-child(3) { animation-delay: .32s; }
//   @keyframes bd-dot-bounce {
//     0%,80%,100% { transform: scale(0.7); opacity:.5; }
//     40%          { transform: scale(1);   opacity:1; }
//   }

//   /* ── ERROR ── */
//   .bd-error {
//     background: rgba(239,68,68,.08);
//     border: 1px solid rgba(239,68,68,.2);
//     border-radius: 10px; padding: 12px 16px;
//     font-size: .85rem; color: #fca5a5;
//     margin-top: 16px;
//   }

//   /* ── SUCCESS ── */
//   .bd-success {
//     background: rgba(34,197,94,.08);
//     border: 1px solid rgba(34,197,94,.2);
//     border-radius: 10px; padding: 12px 16px;
//     font-size: .85rem; color: #86efac;
//     margin-top: 16px; text-align: center;
//   }

//   /* ── SIDE ILLUSTRATION ── */
//   .bd-create-illustration {
//     pointer-events: none; user-select: none;
//     max-width: 320px;
//   }

//   /* ── STEP INDICATORS ── */
//   .bd-steps {
//     display: flex; align-items: center; gap: 0; margin-bottom: 36px;
//   }
//   .bd-step {
//     display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1;
//     position: relative;
//   }
//   .bd-step:not(:last-child)::after {
//     content: ''; position: absolute; top: 15px; left: 60%; right: -40%;
//     height: 1px; background: rgba(255,255,255,.08);
//   }
//   .bd-step-dot {
//     width: 30px; height: 30px; border-radius: 50%;
//     background: rgba(255,255,255,.05);
//     border: 1px solid rgba(255,255,255,.1);
//     display: flex; align-items: center; justify-content: center;
//     font-size: .72rem; font-weight: 700; color: #4a6080;
//     transition: all .3s; z-index: 1;
//   }
//   .bd-step-dot.filled {
//     background: #e8b84b; border-color: #e8b84b; color: #030e1c;
//   }
//   .bd-step-lbl {
//     font-size: .62rem; color: #4a6080; letter-spacing: 1px; text-transform: uppercase;
//     text-align: center;
//   }
//   .bd-step-lbl.filled { color: #e8b84b; }
// `;

// if (!document.getElementById("bd-create-styles")) {
//   const s = document.createElement("style");
//   s.id = "bd-create-styles";
//   s.textContent = css;
//   document.head.appendChild(s);
// }

// /* ─── animation ─── */
// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 28 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.6, ease: "easeOut", delay },
// });

// const floatAnim = {
//   animate: {
//     y: [0, -16, 0],
//     transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
//   },
// };

// const categories = [
//   "Technology", "Lifestyle", "Travel",
//   "Health", "Food", "Education", "Business",
// ];


// const CreateBlog = () => {
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((s) => s.blogs);
//   const { token }          = useSelector((s) => s.auth);
//   const fileRef            = useRef(null);

//   const [formData, setFormData] = useState({
//     title: "", content: "", image: null, category: "",
//   });
//   const [preview,  setPreview]  = useState(null);
//   const [dragOver, setDragOver] = useState(false);
//   const [success,  setSuccess]  = useState(false);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setFormData({ ...formData, image: file });
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) return alert("Please login first!");

//     const fd = new FormData();
//     fd.append("title",    formData.title);
//     fd.append("content",  formData.content);
//     fd.append("category", formData.category);
//     if (formData.image) fd.append("image", formData.image);

//     try {
//       await dispatch(createBlog(fd)).unwrap();
//       setFormData({ title: "", content: "", image: null, category: "" });
//       setPreview(null);
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 4000);
//     } catch (err) {
//       console.error("Blog creation error:", err);
//     }
//   };

//   /* step progress */
//   const step1 = formData.title.length > 0;
//   const step2 = formData.content.length > 0 && formData.category.length > 0;
//   const step3 = formData.image !== null;

//   return (
//     <section className="bd-create">
//       <div className="container">
//         <div className="row align-items-center justify-content-center gy-5">

//           <div className="col-lg-4 d-none d-lg-flex flex-column align-items-center">
//             <motion.img
//               src={img}
//               alt="Create blog illustration"
//               className="bd-create-illustration img-fluid"
//               variants={floatAnim}
//               animate="animate"
//               style={{ opacity: .85 }}
//             />
//             <motion.div {...fadeUp(0.3)} style={{ textAlign: "center", marginTop: 32 }}>
//               <p style={{ fontSize: ".72rem", color: "#7a95b0", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>
//                 Join the community
//               </p>
//               <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#fff", fontWeight: 700, lineHeight: 1.3 }}>
//                 Share your story<br /><em style={{ color: "#e8b84b" }}>with the world</em>
//               </p>
//             </motion.div>
//           </div>

//           {/* ── FORM CARD ── */}
//           <div className="col-12 col-lg-7">
//             <motion.div className="bd-create-card" {...fadeUp(0)}>

//               {/* header */}
//               <div className="mb-4">
//                 <p className="bd-create-eyebrow">New Post</p>
//                 <h1 className="bd-create-h1">Create a <em>Blog</em></h1>
//                 <p className="bd-create-sub">Share your ideas, stories, and expertise with our community.</p>
//               </div>

            
//               <div className="bd-steps">
//                 {[
//                   { n: "1", lbl: "Title",   filled: step1 },
//                   { n: "2", lbl: "Content", filled: step2 },
//                   { n: "3", lbl: "Image",   filled: step3 },
//                 ].map((st) => (
//                   <div key={st.n} className="bd-step">
//                     <div className={`bd-step-dot ${st.filled ? "filled" : ""}`}>{st.filled ? "✓" : st.n}</div>
//                     <span className={`bd-step-lbl ${st.filled ? "filled" : ""}`}>{st.lbl}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* form */}
//               <form onSubmit={handleSubmit}>

//                 {/* Title */}
//                 <div className="mb-3">
//                   <label className="bd-label">Blog Title</label>
//                   <input
//                     type="text"
//                     name="title"
//                     className="bd-input"
//                     placeholder="Enter your blog title..."
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Category */}
//                 <div className="mb-3">
//                   <label className="bd-label">Category</label>
//                   <select
//                     name="category"
//                     className="bd-input"
//                     value={formData.category}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select a category...</option>
//                     {categories.map((c) => (
//                       <option key={c} value={c}>{c}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Content */}
//                 <div className="mb-3">
//                   <label className="bd-label">Content</label>
//                   <textarea
//                     name="content"
//                     className="bd-input"
//                     rows="6"
//                     placeholder="Write your blog content here..."
//                     value={formData.content}
//                     onChange={handleChange}
//                     required
//                     style={{ resize: "vertical", minHeight: 140 }}
//                   />
//                 </div>

//                 {/* File upload */}
//                 <div className="mb-4">
//                   <label className="bd-label">Cover Image</label>
//                   <div
//                     className={`bd-file-zone ${dragOver ? "active" : ""}`}
//                     onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
//                     onDragLeave={() => setDragOver(false)}
//                     onDrop={(e) => {
//                       e.preventDefault(); setDragOver(false);
//                       const file = e.dataTransfer.files[0];
//                       if (file) { setFormData({ ...formData, image: file }); setPreview(URL.createObjectURL(file)); }
//                     }}
//                   >
//                     <input type="file" accept="image/*" onChange={handleFileChange} />
//                     <div className="bd-file-icon">🖼️</div>
//                     <p className="bd-file-label mb-0">
//                       Drag & drop your image or <span>browse</span>
//                     </p>
//                     <p style={{ fontSize: ".72rem", color: "#4a6080", marginTop: 4, marginBottom: 0 }}>
//                       PNG, JPG, WEBP up to 10MB
//                     </p>
//                     {formData.image && (
//                       <p className="bd-file-name">✓ {formData.image.name}</p>
//                     )}
//                   </div>
//                   {preview && (
//                     <img src={preview} alt="preview" className="bd-preview" />
//                   )}
//                 </div>

//                 {/* Submit */}
//                 <motion.button
//                   type="submit"
//                   className="bd-btn-submit"
//                   disabled={loading}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   {loading ? (
//                     <span className="bd-dots">
//                       Publishing<span /><span /><span />
//                     </span>
//                   ) : (
//                     "✦ Publish Blog"
//                   )}
//                 </motion.button>

//               </form>

//               {/* feedback */}
//               {error   && <div className="bd-error">⚠ {error}</div>}
//               {success && <div className="bd-success">🎉 Blog published successfully!</div>}

//             </motion.div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default CreateBlog;
// // src/Pages/CreateBlog.jsx - PURE BOOTSTRAP (MINI CARD)
// // import React, { useState, useRef } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { createBlog } from "../../Redux/slices/BlogSlice";
// // import img from "../../assets/images1.png";
// // import { motion } from "framer-motion";

// // const categories = [
// //   "Technology", "Lifestyle", "Travel",
// //   "Health", "Food", "Education", "Business",
// // ];

// // const CreateBlog = () => {
// //   const dispatch = useDispatch();
// //   const { loading, error } = useSelector((s) => s.blogs);
// //   const { token } = useSelector((s) => s.auth);

// //   const [formData, setFormData] = useState({
// //     title: "", content: "", image: null, category: "",
// //   });
// //   const [preview, setPreview] = useState(null);
// //   const [dragOver, setDragOver] = useState(false);
// //   const [success, setSuccess] = useState(false);

// //   const handleChange = (e) =>
// //     setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     setFormData({ ...formData, image: file });
// //     setPreview(URL.createObjectURL(file));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!token) return alert("Please login first!");

// //     const fd = new FormData();
// //     fd.append("title", formData.title);
// //     fd.append("content", formData.content);
// //     fd.append("category", formData.category);
// //     if (formData.image) fd.append("image", formData.image);

// //     try {
// //       await dispatch(createBlog(fd)).unwrap();
// //       setFormData({ title: "", content: "", image: null, category: "" });
// //       setPreview(null);
// //       setSuccess(true);
// //       setTimeout(() => setSuccess(false), 4000);
// //     } catch (err) {
// //       console.error("Blog creation error:", err);
// //     }
// //   };

// //   const step1 = formData.title.length > 0;
// //   const step2 = formData.content.length > 0 && formData.category.length > 0;
// //   const step3 = formData.image !== null;

// //   return (
// //     <section className="min-vh-100 py-4 py-lg-5 bg-dark bg-gradient position-relative overflow-hidden">
// //       <div className="container">
// //         <div className="row align-items-center justify-content-center g-4 g-lg-5">
          
// //           {/* Side Illustration */}
// //           <div className="col-lg-4 col-xl-3 d-none d-lg-flex flex-column align-items-center text-center">
// //             <motion.img
// //               src={img}
// //               alt="Create blog illustration"
// //               className="img-fluid"
// //               style={{ maxWidth: '280px', opacity: 0.85 }}
// //               variants={{
// //                 animate: {
// //                   y: [0, -16, 0],
// //                   transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
// //                 },
// //               }}
// //               animate="animate"
// //             />
// //             <motion.div 
// //               initial={{ opacity: 0, y: 28 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
// //               style={{ marginTop: '1.5rem' }}
// //             >
// //               <p className="small fw-bold text-warning text-uppercase mb-2">
// //                 Join the community
// //               </p>
// //               <p className="h5 fw-bold text-white mb-0 lh-sm">
// //                 Share your story<br />
// //                 <em className="text-warning">with the world</em>
// //               </p>
// //             </motion.div>
// //           </div>

// //           {/* MINI FORM CARD */}
// //           <div className="col-12 col-lg-6 col-xl-5">
// //             <motion.div 
// //               className="card border-0 shadow-lg bg-dark bg-opacity-10"
// //               style={{ borderRadius: '20px' }}
// //               initial={{ opacity: 0, y: 28 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, ease: "easeOut" }}
// //             >
// //               <div className="card-body p-4 p-md-4">
                
// //                 {/* Header */}
// //                 <div className="mb-3">
// //                   <p className="small fw-bold text-warning text-uppercase mb-2">
// //                     New Post
// //                   </p>
// //                   <h2 className="h3 h2-sm fw-bold text-white mb-2 lh-sm">
// //                     Create a <em className="text-warning">Blog</em>
// //                   </h2>
// //                   <p className="text-secondary small mb-0">
// //                     Share your ideas, stories, and expertise with our community.
// //                   </p>
// //                 </div>

// //                 {/* Step Indicators */}
// //                 <div className="d-flex align-items-center mb-4">
// //                   {[
// //                     { n: "1", lbl: "Title", filled: step1 },
// //                     { n: "2", lbl: "Content", filled: step2 },
// //                     { n: "3", lbl: "Image", filled: step3 },
// //                   ].map((st, i) => (
// //                     <div key={st.n} className="flex-fill text-center position-relative">
// //                       <div 
// //                         className={`mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center fw-bold transition-all ${
// //                           st.filled 
// //                             ? 'bg-warning text-dark shadow' 
// //                             : 'bg-secondary bg-opacity-25 border border-secondary'
// //                         }`}
// //                         style={{ 
// //                           width: '32px', 
// //                           height: '32px', 
// //                           fontSize: '.8rem'
// //                         }}
// //                       >
// //                         {st.filled ? "✓" : st.n}
// //                       </div>
// //                       <small className={`text-uppercase fw-bold ${
// //                         st.filled ? 'text-warning' : 'text-secondary'
// //                       }`}>
// //                         {st.lbl}
// //                       </small>
// //                       {i < 2 && (
// //                         <hr className="position-absolute top-50 start-50 translate-middle w-50 bg-secondary bg-opacity-25 border-0" 
// //                             style={{ right: '-25%', height: '2px', zIndex: 0 }} />
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>

// //                 {/* Form */}
// //                 <form onSubmit={handleSubmit}>
                  
// //                   {/* Title */}
// //                   <div className="mb-3">
// //                     <label className="form-label fw-bold text-uppercase text-secondary small mb-2">
// //                       Blog Title
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="title"
// //                       className="form-control bg-dark bg-opacity-25 border-secondary-subtle text-white"
// //                       placeholder="Enter your blog title..."
// //                       value={formData.title}
// //                       onChange={handleChange}
// //                       required
// //                       style={{ borderRadius: '12px', padding: '0.75rem 1rem' }}
// //                     />
// //                   </div>

// //                   {/* Category */}
// //                   <div className="mb-3">
// //                     <label className="form-label fw-bold text-uppercase text-secondary small mb-2">
// //                       Category
// //                     </label>
// //                     <select
// //                       name="category"
// //                       className="form-control bg-dark bg-opacity-25 border-secondary-subtle text-white"
// //                       value={formData.category}
// //                       onChange={handleChange}
// //                       required
// //                       style={{ borderRadius: '12px', padding: '0.75rem 1rem' }}
// //                     >
// //                       <option value="">Select a category...</option>
// //                       {categories.map((c) => (
// //                         <option key={c} value={c}>{c}</option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   {/* Content */}
// //                   <div className="mb-3">
// //                     <label className="form-label fw-bold text-uppercase text-secondary small mb-2">
// //                       Content
// //                     </label>
// //                     <textarea
// //                       name="content"
// //                       className="form-control bg-dark bg-opacity-25 border-secondary-subtle text-white"
// //                       rows="4"
// //                       placeholder="Write your blog content here..."
// //                       value={formData.content}
// //                       onChange={handleChange}
// //                       required
// //                       style={{ 
// //                         borderRadius: '12px', 
// //                         padding: '0.75rem 1rem',
// //                         resize: 'vertical',
// //                         minHeight: '110px'
// //                       }}
// //                     />
// //                   </div>

// //                   {/* File Upload */}
// //                   <div className="mb-3">
// //                     <label className="form-label fw-bold text-uppercase text-secondary small mb-2">
// //                       Cover Image
// //                     </label>
// //                     <div
// //                       className={`p-3 text-center border border-3 border-secondary-subtle rounded-3 position-relative transition-all ${
// //                         dragOver ? 'border-warning bg-warning bg-opacity-10 shadow' : 'bg-dark bg-opacity-10'
// //                       }`}
// //                       style={{ minHeight: '100px', cursor: 'pointer' }}
// //                       onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
// //                       onDragLeave={() => setDragOver(false)}
// //                       onDrop={(e) => {
// //                         e.preventDefault(); setDragOver(false);
// //                         const file = e.dataTransfer.files[0];
// //                         if (file) { setFormData({ ...formData, image: file }); setPreview(URL.createObjectURL(file)); }
// //                       }}
// //                     >
// //                       <input 
// //                         type="file" 
// //                         accept="image/*" 
// //                         onChange={handleFileChange}
// //                         className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
// //                       />
// //                       <div className="mb-2">
// //                         <span style={{ fontSize: '1.75rem' }}>🖼️</span>
// //                       </div>
// //                       <p className="mb-1 text-secondary small">
// //                         Drag & drop your image or <span className="text-warning fw-bold">browse</span>
// //                       </p>
// //                       <p className="text-secondary xsmall mb-0">
// //                         PNG, JPG, WEBP up to 10MB
// //                       </p>
// //                       {formData.image && (
// //                         <p className="text-warning small fw-bold mt-2 mb-0">
// //                           ✓ {formData.image.name}
// //                         </p>
// //                       )}
// //                     </div>
// //                     {preview && (
// //                       <img 
// //                         src={preview} 
// //                         alt="preview" 
// //                         className="img-fluid rounded mt-2 border border-warning border-opacity-50" 
// //                         style={{ maxHeight: '150px', objectFit: 'cover' }}
// //                       />
// //                     )}
// //                   </div>

// //                   {/* Submit */}
// //                   <motion.button
// //                     type="submit"
// //                     className="btn btn-warning w-100 fw-bold py-2 rounded-pill shadow-lg mb-3 text-dark"
// //                     disabled={loading}
// //                     whileTap={{ scale: 0.98 }}
// //                     style={{ letterSpacing: '0.5px', textTransform: 'uppercase' }}
// //                   >
// //                     {loading ? (
// //                       <span className="d-flex align-items-center justify-content-center gap-1">
// //                         Publishing
// //                         <span className="spinner-border spinner-border-sm ms-1" role="status" aria-hidden="true"></span>
// //                       </span>
// //                     ) : (
// //                       "✦ Publish Blog"
// //                     )}
// //                   </motion.button>
// //                 </form>

// //                 {/* Feedback */}
// //                 {error && (
// //                   <div className="alert alert-danger small py-2 mb-0" role="alert">
// //                     ⚠ {error}
// //                   </div>
// //                 )}
// //                 {success && (
// //                   <div className="alert alert-success small py-2 mb-0 text-center" role="alert">
// //                     🎉 Blog published successfully!
// //                   </div>
// //                 )}
// //               </div>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default CreateBlog;
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