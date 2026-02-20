// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBlogs, deleteBlog } from "../../Redux/slices/BlogSlice";
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Spinner } from "react-bootstrap";
// import { motion } from "framer-motion";

// const gold   = "#e8b84b";
// const dark   = "#030e1c";
// const muted  = "#7a95b0";
// const dimmer = "#4a6080";

// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 28 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.6, ease: "easeOut", delay },
// });

// /* ── Single card ── */
// const BlogCard = ({ blog, isOwner, navigate, onDelete }) => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <motion.div
//       {...fadeUp(0.05)}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "rgba(255,255,255,.03)",
//         border: `1px solid ${hovered ? "rgba(232,184,75,.35)" : "rgba(255,255,255,.08)"}`,
//         borderRadius: 20,
//         overflow: "hidden",
//         backdropFilter: "blur(10px)",
//         transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
//         transform: hovered ? "translateY(-6px)" : "none",
//         boxShadow: hovered ? "0 24px 48px rgba(0,0,0,.5)" : "0 4px 24px rgba(0,0,0,.3)",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         position: "relative",
//       }}>

//       {/* gold top line on hover */}
//       <div style={{
//         position: "absolute", top: 0, left: 0, right: 0, height: 2,
//         background: "linear-gradient(90deg, transparent, #e8b84b, transparent)",
//         opacity: hovered ? 1 : 0,
//         transition: "opacity .25s",
//         zIndex: 1,
//       }} />

//       {/* Image */}
//       {blog.image && (
//         <img src={blog.image} alt={blog.title} className="w-100"
//           style={{ height: 200, objectFit: "cover", filter: hovered ? "brightness(1)" : "brightness(0.82)", transition: "filter .3s" }} />
//       )}

//       <div className="d-flex flex-column flex-fill p-4">

//         {/* Owner badge */}
//         {isOwner(blog) && (
//           <span className="mb-2 d-inline-block"
//             style={{ background: "rgba(232,184,75,.1)", color: gold, fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase", padding: "2px 10px", borderRadius: 20, border: "1px solid rgba(232,184,75,.25)", fontFamily: "'DM Sans', sans-serif" }}>
//             ✦ Your Post
//           </span>
//         )}

//         {/* Category eyebrow */}
//         {blog.category && (
//           <p className="mb-1"
//             style={{ fontSize: ".65rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: dimmer, fontFamily: "'DM Sans', sans-serif" }}>
//             {blog.category}
//           </p>
//         )}

//         {/* Title */}
//         <h5 className="mb-2"
//           style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#f0ecff", lineHeight: 1.4 }}>
//           {blog.title}
//         </h5>

//         {/* Excerpt */}
//         <p className="flex-fill mb-3"
//           style={{
//             color: "#b0a8c8", fontSize: ".88rem", lineHeight: 1.6,
//             fontFamily: "'DM Sans', sans-serif",
//             display: "-webkit-box", WebkitLineClamp: 3,
//             WebkitBoxOrient: "vertical", overflow: "hidden",
//           }}>
//           {blog.content}
//         </p>

//         {/* Gold divider */}
//         <div className="mb-3" style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${gold}, transparent)`, borderRadius: 1 }} />

//         {/* Actions */}
//         <div className="d-flex justify-content-between align-items-center mt-auto">
//           <motion.button
//             whileTap={{ scale: 0.96 }}
//             whileHover={{ background: "rgba(232,184,75,.1)" }}
//             onClick={() => navigate(`/blogs/${blog._id}`)}
//             style={{ background: "transparent", border: "1px solid rgba(232,184,75,.4)", color: gold, borderRadius: 8, fontSize: ".8rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: ".05em", padding: "6px 16px", cursor: "pointer" }}>
//             👁 Read
//           </motion.button>

//           {isOwner(blog) && (
//             <div className="d-flex gap-2">
//               <motion.button
//                 whileTap={{ scale: 0.96 }}
//                 whileHover={{ background: "rgba(100,220,150,.12)" }}
//                 onClick={() => navigate(`/editblog/${blog._id}`)}
//                 style={{ background: "transparent", border: "1px solid rgba(100,220,150,.5)", color: "#7de8a8", borderRadius: 8, fontSize: ".8rem", fontFamily: "'DM Sans', sans-serif", padding: "6px 12px", cursor: "pointer" }}>
//                 ✏️
//               </motion.button>
//               <motion.button
//                 whileTap={{ scale: 0.96 }}
//                 whileHover={{ background: "rgba(255,100,100,.12)" }}
//                 onClick={() => onDelete(blog._id)}
//                 style={{ background: "transparent", border: "1px solid rgba(255,100,100,.5)", color: "#ff8080", borderRadius: 8, fontSize: ".8rem", fontFamily: "'DM Sans', sans-serif", padding: "6px 12px", cursor: "pointer" }}>
//                 🗑️
//               </motion.button>
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// /* ── Main list ── */
// const BlogList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { blogs, loading, error } = useSelector((s) => s.blogs);
//   const { user } = useSelector((s) => s.auth);

//   useEffect(() => { dispatch(fetchBlogs()); }, [dispatch]);

//   const handleDelete = (id) => {
//     if (!window.confirm("Delete this blog?")) return;
//     dispatch(deleteBlog(id));
//   };

//   const isOwner = (blog) => {
//     const authorId = blog.author?._id || blog.author;
//     const userId = user?._id || user?.id;
//     return user && (user.role === "admin" || String(userId) === String(authorId));
//   };

//   if (loading) return (
//     <div className="d-flex align-items-center justify-content-center min-vh-100"
//       style={{ background: "linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)" }}>
//       <div className="text-center">
//         <Spinner animation="border" style={{ color: gold, width: "3rem", height: "3rem" }} />
//         <p style={{ color: muted, marginTop: "1rem", fontFamily: "'DM Sans', sans-serif" }}>Loading blogs...</p>
//       </div>
//     </div>
//   );

//   if (error) return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center"
//       style={{ background: "linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)" }}>
//       <div className="px-4 py-3 rounded-3"
//         style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", color: "#fca5a5", fontFamily: "'DM Sans', sans-serif" }}>
//         ⚠ {error}
//       </div>
//     </div>
//   );

//   return (
//     <div className="position-relative overflow-hidden"
//       style={{
//         minHeight: "100vh",
//         padding: "100px 0 80px",
//         background: `
//           radial-gradient(ellipse 60% 50% at 90% 10%, rgba(232,184,75,.07) 0%, transparent 60%),
//           radial-gradient(ellipse 50% 60% at 5% 90%, rgba(37,99,235,.07) 0%, transparent 60%),
//           linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)
//         `,
//         fontFamily: "'DM Sans', sans-serif",
//       }}>
//       <Container>

//         {/* Header */}
//         <motion.div {...fadeUp(0)} className="text-center mb-5">
//           <p className="d-inline-flex align-items-center gap-2 mb-2"
//             style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: gold }}>
//             <span style={{ width: 26, height: 1, background: gold, display: "inline-block" }} />
//             Explore
//             <span style={{ width: 26, height: 1, background: gold, display: "inline-block" }} />
//           </p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 12 }}>
//             All <em style={{ fontStyle: "italic", color: gold }}>Blogs</em>
//           </h2>
//           <p style={{ color: muted, fontSize: ".9rem", marginBottom: 0 }}>
//             Stories, ideas & insights from our community
//           </p>
//           <div className="mx-auto mt-3" style={{ width: 60, height: 3, background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, borderRadius: 2 }} />
//         </motion.div>

//         {/* Grid */}
//         {blogs.length === 0 ? (
//           <motion.div {...fadeUp(0.2)} className="text-center py-5">
//             <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>📭</div>
//             <p style={{ color: dimmer, fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontStyle: "italic" }}>
//               No blogs found. Be the first to write one!
//             </p>
//           </motion.div>
//         ) : (
//           <Row className="g-4">
//             {blogs.map((blog, i) => (
//               <Col md={4} sm={6} key={blog._id} className="d-flex">
//                 <motion.div
//                   className="w-100"
//                   initial={{ opacity: 0, y: 28 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}>
//                   <BlogCard
//                     blog={blog}
//                     isOwner={isOwner}
//                     navigate={navigate}
//                     onDelete={handleDelete}
//                   />
//                 </motion.div>
//               </Col>
//             ))}
//           </Row>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default BlogList;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../Redux/slices/BlogSlice";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";

const gold   = "#e8b84b";
const dark   = "#030e1c";
const muted  = "#7a95b0";
const dimmer = "#4a6080";

const categories = ["All","General" ,"Technology", "Lifestyle", "Travel", "Health", "Food", "Education", "Business"];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

/* ── Single card ── */
const BlogCard = ({ blog, isOwner, navigate, onDelete }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      {...fadeUp(0.05)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,.03)",
        border: `1px solid ${hovered ? "rgba(232,184,75,.35)" : "rgba(255,255,255,.08)"}`,
        borderRadius: 20,
        overflow: "hidden",
        backdropFilter: "blur(10px)",
        transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? "0 24px 48px rgba(0,0,0,.5)" : "0 4px 24px rgba(0,0,0,.3)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}>

      {/* gold top line on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, #e8b84b, transparent)",
        opacity: hovered ? 1 : 0,
        transition: "opacity .25s",
        zIndex: 1,
      }} />

      {/* Image */}
      {blog.image && (
        <img src={blog.image} alt={blog.title} className="w-100"
          style={{ height: 200, objectFit: "cover", filter: hovered ? "brightness(1)" : "brightness(0.82)", transition: "filter .3s" }} />
      )}

      <div className="d-flex flex-column flex-fill p-4">

        {/* Owner badge */}
        {isOwner(blog) && (
          <span className="mb-2 d-inline-block"
            style={{ background: "rgba(232,184,75,.1)", color: gold, fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase", padding: "2px 10px", borderRadius: 20, border: "1px solid rgba(232,184,75,.25)", fontFamily: "'DM Sans', sans-serif" }}>
            ✦ Your Post
          </span>
        )}

        {/* Category eyebrow */}
        {blog.category && (
          <p className="mb-1"
            style={{ fontSize: ".65rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: dimmer, fontFamily: "'DM Sans', sans-serif" }}>
            {blog.category}
          </p>
        )}

        {/* Title */}
        <h5 className="mb-2"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#f0ecff", lineHeight: 1.4 }}>
          {blog.title}
        </h5>

        {/* Excerpt */}
        <p className="flex-fill mb-3"
          style={{
            color: "#b0a8c8", fontSize: ".88rem", lineHeight: 1.6,
            fontFamily: "'DM Sans', sans-serif",
            display: "-webkit-box", WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
          {blog.content}
        </p>

        {/* Gold divider */}
        <div className="mb-3" style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${gold}, transparent)`, borderRadius: 1 }} />

        {/* Actions */}
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ background: "rgba(232,184,75,.1)" }}
            onClick={() => navigate(`/blogs/${blog._id}`)}
            style={{ background: "transparent", border: "1px solid rgba(232,184,75,.4)", color: gold, borderRadius: 8, fontSize: ".8rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: ".05em", padding: "6px 16px", cursor: "pointer" }}>
            👁 Read
          </motion.button>

          {isOwner(blog) && (
            <div className="d-flex gap-2">
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ background: "rgba(100,220,150,.12)" }}
                onClick={() => navigate(`/editblog/${blog._id}`)}
                style={{ background: "transparent", border: "1px solid rgba(100,220,150,.5)", color: "#7de8a8", borderRadius: 8, fontSize: ".8rem", fontFamily: "'DM Sans', sans-serif", padding: "6px 12px", cursor: "pointer" }}>
                ✏️
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ background: "rgba(255,100,100,.12)" }}
                onClick={() => onDelete(blog._id)}
                style={{ background: "transparent", border: "1px solid rgba(255,100,100,.5)", color: "#ff8080", borderRadius: 8, fontSize: ".8rem", fontFamily: "'DM Sans', sans-serif", padding: "6px 12px", cursor: "pointer" }}>
                🗑️
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main list ── */
const BlogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, loading, error } = useSelector((s) => s.blogs);
  const { user } = useSelector((s) => s.auth);

  const [search,         setSearch]         = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchFocused,  setSearchFocused]  = useState(false);

  useEffect(() => { dispatch(fetchBlogs()); }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this blog?")) return;
    dispatch(deleteBlog(id));
  };

  const isOwner = (blog) => {
    const authorId = blog.author?._id || blog.author;
    const userId = user?._id || user?.id;
    return user && (user.role === "admin" || String(userId) === String(authorId));
  };

  /* ── Filter logic ── */
  const filtered = blogs.filter((blog) => {
    const matchSearch =
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.content?.toLowerCase().includes(search.toLowerCase());
 const matchCategory =
     activeCategory === "All" ||
     (blog.category || "General") === activeCategory;
     return matchSearch && matchCategory; 
  });

  if (loading) return (
    <div className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: "linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)" }}>
      <div className="text-center">
        <Spinner animation="border" style={{ color: gold, width: "3rem", height: "3rem" }} />
        <p style={{ color: muted, marginTop: "1rem", fontFamily: "'DM Sans', sans-serif" }}>Loading blogs...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)" }}>
      <div className="px-4 py-3 rounded-3"
        style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", color: "#fca5a5", fontFamily: "'DM Sans', sans-serif" }}>
        ⚠ {error}
      </div>
    </div>
  );

  return (
    <div className="position-relative overflow-hidden"
      style={{
        minHeight: "100vh",
        padding: "100px 0 80px",
        background: `
          radial-gradient(ellipse 60% 50% at 90% 10%, rgba(232,184,75,.07) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 5% 90%, rgba(37,99,235,.07) 0%, transparent 60%),
          linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)
        `,
        fontFamily: "'DM Sans', sans-serif",
      }}>
      <Container>

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-4">
          <p className="d-inline-flex align-items-center gap-2 mb-2"
            style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: gold }}>
            <span style={{ width: 26, height: 1, background: gold, display: "inline-block" }} />
            Explore
            <span style={{ width: 26, height: 1, background: gold, display: "inline-block" }} />
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 12 }}>
            All <em style={{ fontStyle: "italic", color: gold }}>Blogs</em>
          </h2>
          <p style={{ color: muted, fontSize: ".9rem", marginBottom: 0 }}>
            Stories, ideas & insights from our community
          </p>
          <div className="mx-auto mt-3" style={{ width: 60, height: 3, background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, borderRadius: 2 }} />
        </motion.div>

        {/* ── Search bar ── */}
        <motion.div {...fadeUp(0.1)} className="mb-4">
          <div className="mx-auto position-relative" style={{ maxWidth: 520 }}>
            <span className="position-absolute"
              style={{ left: 16, top: "50%", transform: "translateY(-50%)", fontSize: "1rem", pointerEvents: "none" }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search blogs by title or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                width: "100%",
                background: "rgba(255,255,255,.04)",
                border: `1px solid ${searchFocused ? "rgba(232,184,75,.4)" : "rgba(255,255,255,.09)"}`,
                borderRadius: 50,
                color: "#fff",
                fontSize: ".92rem",
                padding: "12px 46px",
                outline: "none",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: searchFocused ? "0 0 0 3px rgba(232,184,75,.07)" : "none",
                transition: "all .2s",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", color: muted, cursor: "pointer", fontSize: "1rem" }}>
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Category filters ── */}
        <motion.div {...fadeUp(0.15)} className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? gold : "rgba(255,255,255,.04)",
                border: `1px solid ${activeCategory === cat ? gold : "rgba(255,255,255,.09)"}`,
                color: activeCategory === cat ? dark : muted,
                borderRadius: 50,
                padding: "6px 18px",
                fontSize: ".78rem",
                fontWeight: activeCategory === cat ? 700 : 400,
                letterSpacing: ".05em",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all .2s",
              }}>
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Results count — only show when results exist ── */}
        {(search || activeCategory !== "All") && filtered.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4"
            style={{ color: dimmer, fontSize: ".82rem", fontFamily: "'DM Sans', sans-serif" }}>
            {`${filtered.length} blog${filtered.length > 1 ? "s" : ""} found${search ? ` for "${search}"` : ""}${activeCategory !== "All" ? ` in ${activeCategory}` : ""}`}
          </motion.p>
        )}

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <motion.div {...fadeUp(0.2)} className="text-center py-5">
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🔎</div>
            <p style={{ color: dimmer, fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontStyle: "italic" }}>
              {blogs.length === 0 ? "No blogs found. Be the first to write one!" : "No blogs match your search."}
            </p>
            {(search || activeCategory !== "All") && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ background: "rgba(232,184,75,.1)" }}
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                style={{ background: "transparent", border: `1px solid rgba(232,184,75,.4)`, color: gold, borderRadius: 50, padding: "8px 24px", fontSize: ".85rem", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", marginTop: 12 }}>
                Clear filters
              </motion.button>
            )}
          </motion.div>
        ) : (
          <Row className="g-4">
            {filtered.map((blog, i) => (
              <Col md={4} sm={6} key={blog._id} className="d-flex">
                <motion.div
                  className="w-100"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}>
                  <BlogCard
                    blog={blog}
                    isOwner={isOwner}
                    navigate={navigate}
                    onDelete={handleDelete}
                  />
                </motion.div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default BlogList;