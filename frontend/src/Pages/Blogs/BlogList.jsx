import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../Redux/slices/blogSlice";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this blog?")) return;
    dispatch(deleteBlog(id));
  };

  // Ownership check
  const isOwner = (blog) => {
    const authorId = blog.author?._id || blog.author;
    const userId = user?._id || user?.id; // fallback for Google or signup user
    return (
      user && (user.role === "admin" || String(userId) === String(authorId))
    );
  };

  if (loading) return <div className="text-center mt-5">Loading blogs...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📰 All Blogs</h2>
      <div className="row g-4">
        {blogs.length === 0 && <p className="text-center">No blogs found.</p>}
        {blogs.map((blog) => {
          console.log("Blog author:", blog.author);
          console.log("Logged in user:", user);

          return (
            <div className="col-md-4" key={blog._id}>
              <div className="card h-100 shadow-sm">
                {blog.image && (
                  <img
                    src={`http://localhost:5000${blog.image}`}
                    alt={blog.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text text-truncate">{blog.content}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => navigate(`/blogs/${blog._id}`)}
                    >
                      👁 View
                    </button>
                    {isOwner(blog) && (
                      <div>
                        <button
                          className="btn btn-outline-success btn-sm me-2"
                          onClick={() => navigate(`/editblog/${blog._id}`)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(blog._id)}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
