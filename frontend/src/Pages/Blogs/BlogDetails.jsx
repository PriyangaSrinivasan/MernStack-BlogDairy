
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
import { Container, Spinner, Alert } from "react-bootstrap";

const styles = {
  page: {
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    minHeight: "100vh",
    paddingTop: "3rem",
    paddingBottom: "5rem",
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },

  // ── Back button ──────────────────────────────────────────────
  backBtn: {
    background: "transparent",
    border: "1px solid rgba(168,128,255,0.4)",
    color: "#c4aeff",
    borderRadius: "8px",
    padding: "6px 16px",
    fontSize: "0.82rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.06em",
    cursor: "pointer",
    marginBottom: "2rem",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },

  // ── Main card ─────────────────────────────────────────────────
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    overflow: "hidden",
    backdropFilter: "blur(12px)",
    boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
  },

  heroImg: {
    width: "100%",
    maxHeight: "420px",
    objectFit: "cover",
    display: "block",
    filter: "brightness(0.9)",
  },

  cardBody: {
    padding: "2.2rem",
  },

  title: {
    fontFamily: "'Georgia', serif",
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#f0ecff",
    lineHeight: "1.3",
    marginBottom: "1rem",
  },

  divider: {
    width: "50px",
    height: "3px",
    background: "linear-gradient(90deg, #a080ff, #6050d0)",
    borderRadius: "2px",
    marginBottom: "1.6rem",
    border: "none",
  },

  meta: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "2rem",
  },

  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #a080ff, #6050d0)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#fff",
    flexShrink: 0,
    fontFamily: "'Helvetica Neue', sans-serif",
  },

  metaText: {
    fontFamily: "'Helvetica Neue', sans-serif",
  },

  authorName: {
    color: "#e0d8ff",
    fontSize: "0.9rem",
    fontWeight: "600",
    margin: 0,
  },

  authorSub: {
    color: "#7a6a9a",
    fontSize: "0.78rem",
    margin: 0,
  },

  content: {
    color: "#c8c0e0",
    fontSize: "1.05rem",
    lineHeight: "1.85",
    whiteSpace: "pre-line",
    marginBottom: "2rem",
  },

  // ── Action row ────────────────────────────────────────────────
  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    paddingTop: "1.2rem",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    marginBottom: "1.6rem",
  },

  likeBtn: (liked) => ({
    background: liked ? "rgba(168,128,255,0.18)" : "transparent",
    border: `1px solid ${liked ? "rgba(168,128,255,0.7)" : "rgba(168,128,255,0.4)"}`,
    color: "#c4aeff",
    borderRadius: "30px",
    padding: "8px 20px",
    fontSize: "0.85rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    cursor: "pointer",
    letterSpacing: "0.05em",
    transition: "all 0.2s ease",
  }),

  ownerActions: {
    display: "flex",
    gap: "10px",
  },

  editBtn: {
    background: "transparent",
    border: "1px solid rgba(100,220,150,0.5)",
    color: "#7de8a8",
    borderRadius: "8px",
    padding: "7px 16px",
    fontSize: "0.82rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  deleteBtn: {
    background: "transparent",
    border: "1px solid rgba(255,100,100,0.5)",
    color: "#ff8080",
    borderRadius: "8px",
    padding: "7px 16px",
    fontSize: "0.82rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  // ── Comments section ──────────────────────────────────────────
  commentsSection: {
    marginTop: "1rem",
  },

  commentsTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: "1.25rem",
    color: "#e0d8ff",
    marginBottom: "1.2rem",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  commentCount: {
    background: "rgba(168,128,255,0.15)",
    color: "#c4aeff",
    fontSize: "0.7rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.08em",
    padding: "2px 10px",
    borderRadius: "20px",
    border: "1px solid rgba(168,128,255,0.3)",
  },

  commentItem: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "12px",
    padding: "1rem 1.2rem",
    marginBottom: "0.8rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
  },

  commentUser: {
    color: "#c4aeff",
    fontSize: "0.82rem",
    fontWeight: "700",
    fontFamily: "'Helvetica Neue', sans-serif",
    marginBottom: "3px",
  },

  commentText: {
    color: "#b0a8c8",
    fontSize: "0.9rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: "1.5",
  },

  commentActions: {
    display: "flex",
    gap: "6px",
    flexShrink: 0,
  },

  commentEditBtn: {
    background: "transparent",
    border: "1px solid rgba(100,220,150,0.4)",
    color: "#7de8a8",
    borderRadius: "6px",
    padding: "4px 10px",
    fontSize: "0.75rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  commentDeleteBtn: {
    background: "transparent",
    border: "1px solid rgba(255,100,100,0.4)",
    color: "#ff8080",
    borderRadius: "6px",
    padding: "4px 10px",
    fontSize: "0.75rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  // ── Edit comment form ─────────────────────────────────────────
  editForm: {
    display: "flex",
    gap: "8px",
    width: "100%",
    alignItems: "center",
  },

  editInput: {
    flex: 1,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(168,128,255,0.3)",
    borderRadius: "8px",
    color: "#f0ecff",
    padding: "7px 12px",
    fontSize: "0.88rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    outline: "none",
  },

  saveBtn: {
    background: "rgba(100,220,150,0.12)",
    border: "1px solid rgba(100,220,150,0.5)",
    color: "#7de8a8",
    borderRadius: "8px",
    padding: "7px 12px",
    fontSize: "0.82rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  cancelBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#9080b0",
    borderRadius: "8px",
    padding: "7px 12px",
    fontSize: "0.82rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  // ── Add comment input ─────────────────────────────────────────
  addCommentWrapper: {
    display: "flex",
    gap: "10px",
    marginTop: "1.2rem",
    alignItems: "center",
  },

  addCommentInput: {
    flex: 1,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(168,128,255,0.25)",
    borderRadius: "10px",
    color: "#f0ecff",
    padding: "10px 16px",
    fontSize: "0.9rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  },

  addCommentBtn: {
    background: "linear-gradient(135deg, #a080ff, #6050d0)",
    border: "none",
    color: "#fff",
    borderRadius: "10px",
    padding: "10px 20px",
    fontSize: "0.85rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.05em",
    cursor: "pointer",
    transition: "opacity 0.2s ease",
    whiteSpace: "nowrap",
  },

  noComments: {
    textAlign: "center",
    color: "#5a4a7a",
    fontFamily: "'Georgia', serif",
    fontSize: "0.95rem",
    padding: "2rem",
    fontStyle: "italic",
  },
};

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleBlog: blog, loading, error } = useSelector((state) => state.blogs);
  const { user, token } = useSelector((state) => state.auth);

  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" style={{ color: "#a080ff", width: "3rem", height: "3rem" }} />
          <p style={{ color: "#a89fc4", marginTop: "1rem", fontFamily: "sans-serif" }}>Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <Container style={{ maxWidth: "780px" }}>
          <Alert style={{ background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.3)", color: "#ff8080", borderRadius: "12px", textAlign: "center" }}>
            ⚠️ {error}
          </Alert>
        </Container>
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={styles.page}>
        <Container style={{ maxWidth: "780px" }}>
          <p style={{ color: "#7a6a9a", textAlign: "center", fontFamily: "sans-serif" }}>No blog found.</p>
        </Container>
      </div>
    );
  }

  const isOwner =
    user &&
    (user.role === "admin" ||
      String(user._id || user.id) === String(blog.author?._id || blog.author));

  const handleEditBlog = () => navigate(`/editblog/${blog._id}`);
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

  const startEditComment = (c) => {
    setEditingCommentId(c._id);
    setEditingCommentText(c.text);
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  const handleEditCommentSubmit = (e) => {
    e.preventDefault();
    if (!editingCommentText.trim()) return;
    dispatch(editComment({ blogId: blog._id, commentId: editingCommentId, text: editingCommentText }));
    cancelEditComment();
  };

  const handleDeleteCommentClick = (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    dispatch(deleteComment({ blogId: blog._id, commentId }));
  };

  const authorInitial = (blog.author?.name || "U")[0].toUpperCase();
  const userLiked = blog.likes?.includes(user?._id || user?.id);

  return (
    <div style={styles.page}>
      <Container style={{ maxWidth: "800px" }}>
        {/* Back */}
        <button
          style={styles.backBtn}
          onClick={() => navigate("/blogs")}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(168,128,255,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          ← Back to Blogs
        </button>

        {/* Main card */}
        <div style={styles.card}>
          {blog.image && (
            <img src={blog.image} alt={blog.title} style={styles.heroImg} />
          )}

          <div style={styles.cardBody}>
            <h1 style={styles.title}>{blog.title}</h1>
            <hr style={styles.divider} />

            {/* Author meta */}
            <div style={styles.meta}>
              <div style={styles.avatar}>{authorInitial}</div>
              <div style={styles.metaText}>
                <p style={styles.authorName}>{blog.author?.name || "Unknown"}</p>
                <p style={styles.authorSub}>
                  {blog.author?.email || "N/A"} &nbsp;·&nbsp;{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Content */}
            <p style={styles.content}>{blog.content}</p>

            {/* Like + Owner actions */}
            <div style={styles.actionRow}>
              <button
                style={styles.likeBtn(userLiked)}
                onClick={handleLike}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(168,128,255,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = userLiked ? "rgba(168,128,255,0.18)" : "transparent")}
              >
                👍 Like &nbsp;<span style={{ opacity: 0.7 }}>({blog.likes?.length || 0})</span>
              </button>

              {isOwner && (
                <div style={styles.ownerActions}>
                  <button
                    style={styles.editBtn}
                    onClick={handleEditBlog}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(100,220,150,0.12)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={handleDeleteBlog}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,100,100,0.12)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>

            {/* Comments */}
            <div style={styles.commentsSection}>
              <h5 style={styles.commentsTitle}>
                Comments{" "}
                <span style={styles.commentCount}>{blog.comments?.length || 0}</span>
              </h5>

              {blog.comments?.length === 0 && (
                <p style={styles.noComments}>No comments yet. Be the first to share your thoughts!</p>
              )}

              {blog.comments?.map((c) => {
                const isCommentOwner =
                  user &&
                  (user.role === "admin" ||
                    String(user._id || user.id) === String(c.user?._id || c.user));

                return (
                  <div key={c._id} style={styles.commentItem}>
                    {editingCommentId === c._id ? (
                      <form style={styles.editForm} onSubmit={handleEditCommentSubmit}>
                        <input
                          style={styles.editInput}
                          value={editingCommentText}
                          onChange={(e) => setEditingCommentText(e.target.value)}
                          autoFocus
                        />
                        <button type="submit" style={styles.saveBtn}>✔</button>
                        <button type="button" style={styles.cancelBtn} onClick={cancelEditComment}>✖</button>
                      </form>
                    ) : (
                      <>
                        <div>
                          <p style={styles.commentUser}>{c.user?.name || "User"}</p>
                          <p style={styles.commentText}>{c.text}</p>
                        </div>
                        {isCommentOwner && (
                          <div style={styles.commentActions}>
                            <button
                              style={styles.commentEditBtn}
                              onClick={() => startEditComment(c)}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(100,220,150,0.12)")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                              ✏️
                            </button>
                            <button
                              style={styles.commentDeleteBtn}
                              onClick={() => handleDeleteCommentClick(c._id)}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,100,100,0.12)")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                              🗑️
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}

              {/* Add comment */}
              {token && !editingCommentId && (
                <form onSubmit={handleAddComment} style={styles.addCommentWrapper}>
                  <input
                    style={styles.addCommentInput}
                    placeholder="Share your thoughts..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(168,128,255,0.6)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(168,128,255,0.25)")}
                  />
                  <button
                    type="submit"
                    style={styles.addCommentBtn}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    💬 Post
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogDetails;