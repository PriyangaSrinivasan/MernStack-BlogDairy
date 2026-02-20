

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBlogs, deleteBlog } from "../../Redux/slices/BlogSlice";
// import { useNavigate } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Badge,
//   Spinner,
//   Alert,
// } from "react-bootstrap";

// // Inline styles for custom theming (no external CSS file needed)
// const styles = {
//   page: {
//     background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
//     minHeight: "100vh",
//     paddingTop: "3rem",
//     paddingBottom: "4rem",
//     fontFamily: "'Georgia', 'Times New Roman', serif",
//   },
//   heading: {
//     fontFamily: "'Georgia', serif",
//     fontWeight: "700",
//     fontSize: "2.8rem",
//     letterSpacing: "-0.5px",
//     color: "#fff",
//     textAlign: "center",
//     marginBottom: "0.5rem",
//   },
//   subheading: {
//     textAlign: "center",
//     color: "#a89fc4",
//     fontSize: "1rem",
//     marginBottom: "2.5rem",
//     fontFamily: "'Helvetica Neue', sans-serif",
//     letterSpacing: "0.08em",
//     textTransform: "uppercase",
//   },
//   card: {
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.1)",
//     borderRadius: "16px",
//     overflow: "hidden",
//     backdropFilter: "blur(10px)",
//     transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
//     height: "100%",
//     cursor: "pointer",
//   },
//   cardHover: {
//     transform: "translateY(-6px)",
//     boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
//     borderColor: "rgba(168,128,255,0.5)",
//   },
//   cardImg: {
//     height: "200px",
//     objectFit: "cover",
//     filter: "brightness(0.85)",
//     transition: "filter 0.3s ease",
//   },
//   cardBody: {
//     display: "flex",
//     flexDirection: "column",
//     padding: "1.4rem",
//   },
//   cardTitle: {
//     fontFamily: "'Georgia', serif",
//     fontSize: "1.15rem",
//     fontWeight: "700",
//     color: "#f0ecff",
//     marginBottom: "0.5rem",
//     lineHeight: "1.4",
//   },
//   cardText: {
//     color: "#b0a8c8",
//     fontSize: "0.88rem",
//     lineHeight: "1.6",
//     fontFamily: "'Helvetica Neue', sans-serif",
//     overflow: "hidden",
//     display: "-webkit-box",
//     WebkitLineClamp: 3,
//     WebkitBoxOrient: "vertical",
//     flex: 1,
//     marginBottom: "1.2rem",
//   },
//   btnView: {
//     background: "transparent",
//     border: "1px solid rgba(168,128,255,0.6)",
//     color: "#c4aeff",
//     borderRadius: "8px",
//     fontSize: "0.8rem",
//     fontFamily: "'Helvetica Neue', sans-serif",
//     letterSpacing: "0.05em",
//     padding: "6px 14px",
//     transition: "all 0.2s ease",
//   },
//   btnEdit: {
//     background: "transparent",
//     border: "1px solid rgba(100,220,150,0.5)",
//     color: "#7de8a8",
//     borderRadius: "8px",
//     fontSize: "0.8rem",
//     fontFamily: "'Helvetica Neue', sans-serif",
//     letterSpacing: "0.05em",
//     padding: "6px 12px",
//     marginRight: "6px",
//     transition: "all 0.2s ease",
//   },
//   btnDelete: {
//     background: "transparent",
//     border: "1px solid rgba(255,100,100,0.5)",
//     color: "#ff8080",
//     borderRadius: "8px",
//     fontSize: "0.8rem",
//     fontFamily: "'Helvetica Neue', sans-serif",
//     letterSpacing: "0.05em",
//     padding: "6px 12px",
//     transition: "all 0.2s ease",
//   },
//   divider: {
//     width: "60px",
//     height: "3px",
//     background: "linear-gradient(90deg, #a080ff, #6050d0)",
//     margin: "0 auto 2.5rem",
//     borderRadius: "2px",
//   },
//   emptyState: {
//     textAlign: "center",
//     color: "#7a6a9a",
//     fontFamily: "'Georgia', serif",
//     fontSize: "1.1rem",
//     padding: "3rem",
//   },
//   ownerBadge: {
//     background: "rgba(168,128,255,0.15)",
//     color: "#c4aeff",
//     fontSize: "0.65rem",
//     letterSpacing: "0.1em",
//     textTransform: "uppercase",
//     padding: "2px 8px",
//     borderRadius: "20px",
//     fontFamily: "'Helvetica Neue', sans-serif",
//     border: "1px solid rgba(168,128,255,0.3)",
//     display: "inline-block",
//     marginBottom: "0.5rem",
//   },
// };

// const BlogList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { blogs, loading, error } = useSelector((state) => state.blogs);
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(fetchBlogs());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;
//     dispatch(deleteBlog(id));
//   };

//   const isOwner = (blog) => {
//     const authorId = blog.author?._id || blog.author;
//     const userId = user?._id || user?.id;
//     return (
//       user && (user.role === "admin" || String(userId) === String(authorId))
//     );
//   };

//   if (loading) {
//     return (
//       <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ textAlign: "center" }}>
//           <Spinner animation="border" style={{ color: "#a080ff", width: "3rem", height: "3rem" }} />
//           <p style={{ color: "#a89fc4", marginTop: "1rem", fontFamily: "sans-serif" }}>
//             Loading blogs...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={styles.page}>
//         <Container>
//           <Alert
//             variant="danger"
//             style={{
//               background: "rgba(255,80,80,0.1)",
//               border: "1px solid rgba(255,80,80,0.3)",
//               color: "#ff8080",
//               borderRadius: "12px",
//               textAlign: "center",
//               fontFamily: "sans-serif",
//             }}
//           >
//             ⚠️ {error}
//           </Alert>
//         </Container>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.page}>
//       <Container>
//         {/* Header */}
//         <h2 style={styles.heading}>All Blogs</h2>
//         <p style={styles.subheading}>Explore stories, ideas & insights</p>
//         <div style={styles.divider} />

//         {/* Grid */}
//         <Row className="g-4">
//           {blogs.length === 0 ? (
//             <Col>
//               <div style={styles.emptyState}>
//                 <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
//                 No blogs found. Be the first to write one!
//               </div>
//             </Col>
//           ) : (
//             blogs.map((blog) => (
//               <Col md={4} sm={6} key={blog._id}>
//                 <HoverCard blog={blog} isOwner={isOwner} navigate={navigate} handleDelete={handleDelete} />
//               </Col>
//             ))
//           )}
//         </Row>
//       </Container>
//     </div>
//   );
// };

// // Separate card component to handle hover state cleanly
// const HoverCard = ({ blog, isOwner, navigate, handleDelete }) => {
//   const [hovered, setHovered] = React.useState(false);

//   return (
//     <div
//       style={{ ...styles.card, ...(hovered ? styles.cardHover : {}) }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {blog.image && (
//         <img
//           src={blog.image}
//           alt={blog.title}
//           style={{
//             ...styles.cardImg,
//             filter: hovered ? "brightness(1)" : "brightness(0.85)",
//           }}
//           className="w-100"
//         />
//       )}

//       <div style={styles.cardBody}>
//         {isOwner(blog) && (
//           <span style={styles.ownerBadge}>✦ Your Post</span>
//         )}

//         <h5 style={styles.cardTitle}>{blog.title}</h5>
//         <p style={styles.cardText}>{blog.content}</p>

//         {/* Actions */}
//         <div className="d-flex justify-content-between align-items-center mt-auto">
//           <button
//             style={styles.btnView}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "rgba(168,128,255,0.15)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "transparent";
//             }}
//             onClick={() => navigate(`/blogs/${blog._id}`)}
//           >
//             👁 Read
//           </button>

//           {isOwner(blog) && (
//             <div>
//               <button
//                 style={styles.btnEdit}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "rgba(100,220,150,0.12)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "transparent";
//                 }}
//                 onClick={() => navigate(`/editblog/${blog._id}`)}
//               >
//                 ✏️ Edit
//               </button>
//               <button
//                 style={styles.btnDelete}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "rgba(255,100,100,0.12)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "transparent";
//                 }}
//                 onClick={() => handleDelete(blog._id)}
//               >
//                 🗑 Delete
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
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

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-5">
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

        {/* Grid */}
        {blogs.length === 0 ? (
          <motion.div {...fadeUp(0.2)} className="text-center py-5">
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>📭</div>
            <p style={{ color: dimmer, fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontStyle: "italic" }}>
              No blogs found. Be the first to write one!
            </p>
          </motion.div>
        ) : (
          <Row className="g-4">
            {blogs.map((blog, i) => (
              <Col md={4} sm={6} key={blog._id} className="d-flex">
                <motion.div
                  className="w-100"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}>
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