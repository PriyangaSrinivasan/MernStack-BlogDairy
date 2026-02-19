
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, updateBlog } from "../../Redux/slices/BlogSlice";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleBlog, loading, error } = useSelector((state) => state.blogs);
  const { user, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleBlog) {
      setFormData({
        title: singleBlog.title || "",
        content: singleBlog.content || "",
        category: singleBlog.category || "",
        image: null,
      });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("You must be logged in to edit a blog.");
    try {
      setUpdating(true);
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("content", formData.content);
      fd.append("category", formData.category);
      if (formData.image) fd.append("image", formData.image);
      await dispatch(updateBlog({ id, blogData: fd })).unwrap();
      alert("Blog updated successfully!");
      navigate(`/blogs/${id}`);
    } catch (err) {
      alert(err || "Failed to update blog");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
      >
        <div className="text-center">
          <div className="spinner-border" style={{ width: "3rem", height: "3rem", color: "#a080ff" }} role="status" />
          <p className="mt-3" style={{ color: "#a89fc4" }}>Loading blog...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div
        className="min-vh-100 py-5"
        style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
      >
        <div className="container" style={{ maxWidth: "680px" }}>
          <div className="alert alert-danger text-center rounded-3">{error}</div>
        </div>
      </div>
    );

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
    >
      <div className="container" style={{ maxWidth: "680px" }}>

        {/* Back button */}
        <button
          className="btn btn-outline-light btn-sm mb-4"
          onClick={() => navigate(`/blogs/${id}`)}
        >
          ← Back to Blog
        </button>

        {/* Card */}
        <div
          className="card shadow-lg border-0 rounded-4"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="card-body p-4 p-md-5">

            {/* Header */}
            <h2 className="card-title text-center fw-bold mb-1 text-white">✏️ Edit Blog</h2>
            <p className="text-center small mb-4" style={{ color: "#a89fc4" }}>Update your story below</p>
            <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} className="mb-4" />

            <form onSubmit={handleSubmit}>

              {/* Title */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-white">Blog Title</label>
                <input
                  type="text"
                  className="form-control form-control-lg rounded-3 text-white border-0"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a compelling title..."
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-white">Category</label>
                <input
                  type="text"
                  className="form-control rounded-3 text-white border-0"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Technology, Travel, Food..."
                />
              </div>

              {/* Content */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-white">Content</label>
                <textarea
                  className="form-control rounded-3 text-white border-0"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  name="content"
                  rows="7"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Tell your story..."
                  required
                />
              </div>

              {/* Image upload */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-white">Cover Image</label>
                <input
                  type="file"
                  className="form-control rounded-3 text-white border-0"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div className="form-text" style={{ color: "#7a6a9a" }}>Leave empty to keep the existing image.</div>
              </div>

              {/* Image preview */}
              {previewImage && (
                <div className="mb-4">
                  <label className="form-label fw-semibold small" style={{ color: "#a89fc4" }}>Preview</label>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="img-fluid rounded-3 w-100"
                    style={{ maxHeight: "280px", objectFit: "cover" }}
                  />
                </div>
              )}

              {/* Action buttons */}
              <div className="d-flex gap-3 justify-content-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 rounded-3 fw-semibold"
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                      Updating...
                    </>
                  ) : (
                    "💾 Save Changes"
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light px-4 py-2 rounded-3"
                  onClick={() => navigate(`/blogs/${id}`)}
                >
                  🔙 Cancel
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditBlog;