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
} from "../../Redux/Slices/BlogSlice";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleBlog: blog, loading, error } = useSelector((state) => state.blogs);
  const { user, token } = useSelector((state) => state.auth);

  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  // Fetch the blog on mount
  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-4">{error}</div>;
  if (!blog) return <div className="text-center mt-4">No blog found.</div>;

  // ✅ Ownership check (works for Google & normal signup users)
const isOwner =
  user &&
  (user.role === "admin" ||
    String(user._id || user.id) === String(blog.author?._id || blog.author));


  // Blog actions
  const handleEditBlog = () => navigate(`/editblog/${blog._id}`);
  const handleDeleteBlog = () => {
    if (!window.confirm("Delete this blog?")) return;
    dispatch(deleteBlog(blog._id)).then(() => navigate("/blogs"));
  };
  const handleLike = () => {
    if (!token) return alert("Login to like blogs");
    dispatch(likeBlog(blog._id));
  };

  // Comment actions
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
    dispatch(
      editComment({
        blogId: blog._id,
        commentId: editingCommentId,
        text: editingCommentText,
      })
    );
    cancelEditComment();
  };

  const handleDeleteCommentClick = (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    dispatch(deleteComment({ blogId: blog._id, commentId }));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3 text-primary">{blog.title}</h2>

        {blog.image && (
          <img
            src={`http://localhost:5000${blog.image}`}
            alt={blog.title}
            className="img-fluid rounded mb-3"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        )}

        <p className="lead" style={{ whiteSpace: "pre-line" }}>
          {blog.content}
        </p>

        <p className="text-muted mt-3">
          <strong>Author:</strong> {blog.author?.name || "Unknown"} <br />
          <strong>Email:</strong> {blog.author?.email || "N/A"} <br />
          <small className="text-secondary">
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </small>
        </p>

        <div className="mb-3">
          <button className="btn btn-outline-primary me-2" onClick={handleLike}>
            👍 Like ({blog.likes?.length || 0})
          </button>
        </div>

        {isOwner && (
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-warning" onClick={handleEditBlog}>
              ✏️ Edit
            </button>
            <button className="btn btn-danger" onClick={handleDeleteBlog}>
              🗑️ Delete
            </button>
          </div>
        )}

        <hr />
        <h5>Comments ({blog.comments?.length || 0})</h5>
        <ul className="list-group mb-3">
          {blog.comments?.map((c) => {
        const isCommentOwner =
              user &&
              (user.role === "admin" ||
                String(user._id || user.id) === String(c.user?._id || c.user));


            return (
              <li
                key={c._id}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                {editingCommentId === c._id ? (
                  <form
                    className="w-100 d-flex gap-2"
                    onSubmit={handleEditCommentSubmit}
                  >
                    <input
                      type="text"
                      className="form-control"
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                    />
                    <button className="btn btn-success" type="submit">
                      ✔️
                    </button>
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={cancelEditComment}
                    >
                      ✖️
                    </button>
                  </form>
                ) : (
                  <>
                    <div>
                      <strong>{c.user?.name || "User"}:</strong> {c.text}
                    </div>
                    {isCommentOwner && (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => startEditComment(c)}
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteCommentClick(c._id)}
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>

        {token && !editingCommentId && (
          <form onSubmit={handleAddComment}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                💬 Comment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
