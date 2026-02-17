import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../Redux/slices/blogSlice";
import img from "../../assets/images1.png";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.blogs);
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null, // File object
    category: "",
  });

  // Update text inputs
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Update file input
  const handleFileChange = (e) =>
    setFormData({ ...formData, image: e.target.files[0] });

  // Submit blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Login first!");

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("content", formData.content);
    fd.append("category", formData.category);
    if (formData.image) fd.append("image", formData.image); // send file

    try {
      await dispatch(createBlog(fd)).unwrap();

      // Reset form
      setFormData({ title: "", content: "", image: null, category: "" });
    } catch (err) {
      console.error("Blog creation error:", err);
    }
  };

  return (
    <div className="create-blog-page d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="container position-relative">
        <img
          src={img}
          width={350}
          className="position-absolute"
          style={{ top: "-40%", right: "5%", opacity: "0.6" }}
        />
        <div className="card p-4 mx-auto border-2 py-5" style={{ maxWidth: "700px", position: "relative", zIndex: 10 }}>
          <h3 className="text-center mb-3">📝 Create Blog</h3>
          <form onSubmit={handleSubmit} className="border-1">
            <input
              type="text"
              name="title"
              className="form-control mb-2"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="content"
              className="form-control mb-2"
              rows="5"
              placeholder="Content"
              value={formData.content}
              onChange={handleChange}
              required
            />

            <input
              type="file"
              name="image"
              className="form-control mb-2"
              accept="image/*"
              onChange={handleFileChange}
            />

            <select
              name="category"
              className="form-control mb-2"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Health">Health</option>
              <option value="Food">Food</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
            </select>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Creating..." : "Create Blog"}
            </button>
          </form>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;

