import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, updateBlog } from "../../Redux/slices/blogSlice";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleBlog, loading, error } = useSelector((state) => state.blogs);
  const { user, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
  });

  const [updating, setUpdating] = useState(false);

  // Fetch blog
  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  // Populate form
  useEffect(() => {
    if (singleBlog) {
      setFormData({
        title: singleBlog.title || "",
        content: singleBlog.content || "",
        image:
          typeof singleBlog.image === "string"
            ? singleBlog.image
            : singleBlog.image?.url || "",
        category: singleBlog.category || "",
      });
    }
  }, [singleBlog]);

  // Ownership check
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in to edit a blog.");
      return;
    }
    try {
      setUpdating(true);
      await dispatch(updateBlog({ id, blogData: formData })).unwrap();
      alert("Blog updated successfully!");
      navigate(`/blogs/${id}`);
    } catch (err) {
      alert(err || "Failed to update blog");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading blog...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">✏️ Edit Blog</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Blog Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              name="content"
              rows="5"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary me-2"
              disabled={updating}
            >
              {updating ? "Updating..." : "💾 Update Blog"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/blogs/${id}`)}
            >
              🔙 Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
