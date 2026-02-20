import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchBlogById,
  deleteBlog,
  likeBlog,
  addComment,
  editComment,
  deleteComment,
} from "../../Redux/slices/BlogSlice";
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

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleBlog: blog, loading, error } = useSelector((s) => s.blogs);
  const { user, token } = useSelector((s) => s.auth);

  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [focusedComment, setFocusedComment] = useState(false);

  useEffect(() => { dispatch(fetchBlogById(id)); }, [dispatch, id]);

  if (loading) return (
    <div className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: "linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)" }}>
      <div className="text-center">
        <Spinner animation="border" style={{ color: gold, width: "3rem", height: "3rem" }} />
        <p style={{ color: muted, marginTop: "1rem", fontFamily: "'DM Sans', sans-serif" }}>Loading blog...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%)" }}>
      <div className="px-4 py-3 rounded-3 text-center"
        style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", color: "#fca5a5", fontFamily: "'DM Sans', sans-serif" }}>
        ⚠ {error}
      </div>
    </div>
  );

  if (!blog) return null;

  const isOwner = user && (user.role === "admin" || String(user._id || user.id) === String(blog.author?._id || blog.author));
      const userId = String(user?._id || user?.id);
      const userLiked = blog.likes?.some(like => 
        String(like.user?._id || like.user || like) === userId
      );
  const authorInitial = (blog.author?.name || "U")[0].toUpperCase();

  const handleDeleteBlog = () => {
    if (!window.confirm("Delete this blog?")) return;
    dispatch(deleteBlog(blog._id)).then(() => navigate("/blogs"));
  };
  const handleLike = () => {
    if (!token) return alert("Login to like blogs");
    dispatch(likeBlog(blog._id));
  };
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    dispatch(addComment({ blogId: blog._id, text: commentText }));
    setCommentText("");
  };
  const handleEditCommentSubmit = (e) => {
    e.preventDefault();
    if (!editingCommentText.trim()) return;
    dispatch(editComment({ blogId: blog._id, commentId: editingCommentId, text: editingCommentText }));
    setEditingCommentId(null);
    setEditingCommentText("");
  };
  const handleDeleteComment = (commentId) => {
    if (!window.confirm("Delete comment?")) return;
    dispatch(deleteComment({ blogId: blog._id, commentId }));
  };

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
      <Container style={{ maxWidth: 820 }}>

        {/* Back button */}
        <motion.button
          {...fadeUp(0)}
          className="mb-4 d-inline-flex align-items-center gap-2"
          onClick={() => navigate("/blogs")}
          style={{
            background: "transparent",
            border: "1px solid rgba(232,184,75,.3)",
            color: gold,
            borderRadius: 8,
            padding: "7px 18px",
            fontSize: ".82rem",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: ".06em",
            cursor: "pointer",
          }}
          whileHover={{ background: "rgba(232,184,75,.08)" }}
        >
          ← Back to Blogs
        </motion.button>

        {/* Main card */}
        <motion.div
          {...fadeUp(0.1)}
          className="overflow-hidden position-relative"
          style={{
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 24,
            backdropFilter: "blur(12px)",
            boxShadow: "0 32px 64px rgba(0,0,0,.5)",
          }}>

          {/* Gold top line */}
          <div className="position-absolute top-0 start-0 end-0"
            style={{ height: 2, background: "linear-gradient(90deg, transparent, #e8b84b, transparent)", zIndex: 1 }} />

          {/* Hero image */}
          {blog.image && (
            <img src={blog.image} alt={blog.title}
              className="w-100" style={{ maxHeight: 420, objectFit: "cover", display: "block", filter: "brightness(0.88)" }} />
          )}

          <div className="p-4 p-md-5">

            {/* Eyebrow */}
            <p className="d-inline-flex align-items-center gap-2 mb-2"
              style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: gold }}>
              <span style={{ width: 26, height: 1, background: gold, display: "inline-block" }} />
              {blog.category || "Blog"}
            </p>

            {/* Title */}
            <h1 className="mb-3"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2 }}>
              {blog.title}
            </h1>

            {/* Gold divider */}
            <div className="mb-4" style={{ width: 50, height: 3, background: `linear-gradient(90deg, ${gold}, transparent)`, borderRadius: 2 }} />

            {/* Author meta */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${gold}, #c49020)`, color: dark, fontWeight: 700, fontSize: "1.1rem", fontFamily: "'DM Sans', sans-serif" }}>
                {authorInitial}
              </div>
              <div>
                <p className="mb-0" style={{ color: "#e0d8ff", fontSize: ".9rem", fontWeight: 600 }}>
                  {blog.author?.name || "Unknown"}
                </p>
                <p className="mb-0" style={{ color: dimmer, fontSize: ".78rem" }}>
                  {blog.author?.email || "N/A"} &nbsp;·&nbsp;{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>

            {/* Content */}
            <p className="mb-4" style={{ color: "#c8c0e0", fontSize: "1.05rem", lineHeight: 1.85, whiteSpace: "pre-line" }}>
              {blog.content}
            </p>

            {/* Action row */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 pt-3 mb-4"
              style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleLike}
                style={{
                  background: userLiked ? "rgba(232,184,75,.15)" : "transparent",
                  border: `1px solid ${userLiked ? "rgba(232,184,75,.6)" : "rgba(232,184,75,.3)"}`,
                  color: gold,
                  borderRadius: 30,
                  padding: "8px 20px",
                  fontSize: ".85rem",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: ".05em",
                }}>
                👍 Like &nbsp;<span style={{ opacity: .7 }}>({blog.likes?.length || 0})</span>
              </motion.button>

              {isOwner && (
                <div className="d-flex gap-2">
                  <motion.button whileTap={{ scale: 0.96 }} onClick={() => navigate(`/editblog/${blog._id}`)}
                    style={{ background: "transparent", border: "1px solid rgba(100,220,150,.5)", color: "#7de8a8", borderRadius: 8, padding: "7px 16px", fontSize: ".82rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                    whileHover={{ background: "rgba(100,220,150,.1)" }}>
                    ✏️ Edit
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.96 }} onClick={handleDeleteBlog}
                    style={{ background: "transparent", border: "1px solid rgba(255,100,100,.5)", color: "#ff8080", borderRadius: 8, padding: "7px 16px", fontSize: ".82rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                    whileHover={{ background: "rgba(255,100,100,.1)" }}>
                    🗑️ Delete
                  </motion.button>
                </div>
              )}
            </div>

            {/* Comments section */}
            <div>
              <h5 className="d-flex align-items-center gap-2 mb-3"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#e0d8ff" }}>
                Comments
                <span style={{ background: "rgba(232,184,75,.12)", color: gold, fontSize: ".7rem", padding: "2px 10px", borderRadius: 20, border: "1px solid rgba(232,184,75,.3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: ".08em" }}>
                  {blog.comments?.length || 0}
                </span>
              </h5>

              {blog.comments?.length === 0 && (
                <p className="text-center fst-italic py-4" style={{ color: dimmer, fontFamily: "'Playfair Display', serif" }}>
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}

              {blog.comments?.map((c) => {
                const isCommentOwner = user && (user.role === "admin" || String(user._id || user.id) === String(c.user?._id || c.user));
                return (
                  <motion.div key={c._id} {...fadeUp(0)}
                    className="d-flex justify-content-between align-items-start gap-3 mb-3 p-3"
                    style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12 }}>
                    {editingCommentId === c._id ? (
                      <form className="d-flex gap-2 w-100 align-items-center" onSubmit={handleEditCommentSubmit}>
                        <input
                          className="flex-fill px-3 py-2"
                          value={editingCommentText}
                          onChange={(e) => setEditingCommentText(e.target.value)}
                          autoFocus
                          style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(232,184,75,.3)", borderRadius: 8, color: "#f0ecff", fontSize: ".88rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}
                        />
                        <button type="submit" style={{ background: "rgba(100,220,150,.12)", border: "1px solid rgba(100,220,150,.5)", color: "#7de8a8", borderRadius: 8, padding: "7px 12px", cursor: "pointer" }}>✔</button>
                        <button type="button" onClick={() => setEditingCommentId(null)} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.15)", color: "#9080b0", borderRadius: 8, padding: "7px 12px", cursor: "pointer" }}>✖</button>
                      </form>
                    ) : (
                      <>
                        <div>
                          <p className="mb-1" style={{ color: gold, fontSize: ".82rem", fontWeight: 700 }}>{c.user?.name || "User"}</p>
                          <p className="mb-0" style={{ color: "#b0a8c8", fontSize: ".9rem", lineHeight: 1.5 }}>{c.text}</p>
                        </div>
                        {isCommentOwner && (
                          <div className="d-flex gap-2 flex-shrink-0">
                            <button onClick={() => { setEditingCommentId(c._id); setEditingCommentText(c.text); }}
                              style={{ background: "transparent", border: "1px solid rgba(100,220,150,.4)", color: "#7de8a8", borderRadius: 6, padding: "4px 10px", fontSize: ".75rem", cursor: "pointer" }}>✏️</button>
                            <button onClick={() => handleDeleteComment(c._id)}
                              style={{ background: "transparent", border: "1px solid rgba(255,100,100,.4)", color: "#ff8080", borderRadius: 6, padding: "4px 10px", fontSize: ".75rem", cursor: "pointer" }}>🗑️</button>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                );
              })}

              {/* Add comment */}
              {token && !editingCommentId && (
                <form onSubmit={handleAddComment} className="d-flex gap-3 align-items-center mt-3">
                  <input
                    className="flex-fill px-3 py-2"
                    placeholder="Share your thoughts..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onFocus={() => setFocusedComment(true)}
                    onBlur={() => setFocusedComment(false)}
                    style={{
                      background: "rgba(255,255,255,.05)",
                      border: `1px solid ${focusedComment ? "rgba(232,184,75,.4)" : "rgba(255,255,255,.09)"}`,
                      borderRadius: 10,
                      color: "#fff",
                      padding: "10px 16px",
                      fontSize: ".9rem",
                      fontFamily: "'DM Sans', sans-serif",
                      outline: "none",
                      boxShadow: focusedComment ? "0 0 0 3px rgba(232,184,75,.07)" : "none",
                      transition: "all .2s",
                    }}
                  />
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ background: "#f5d98a" }}
                    style={{ background: gold, color: dark, border: "none", borderRadius: 10, padding: "10px 20px", fontSize: ".85rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", letterSpacing: ".05em" }}>
                    💬 Post
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default BlogDetails;