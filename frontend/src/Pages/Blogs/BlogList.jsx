

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../Redux/slices/BlogSlice";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";

// Inline styles for custom theming (no external CSS file needed)
const styles = {
  page: {
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    minHeight: "100vh",
    paddingTop: "3rem",
    paddingBottom: "4rem",
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  heading: {
    fontFamily: "'Georgia', serif",
    fontWeight: "700",
    fontSize: "2.8rem",
    letterSpacing: "-0.5px",
    color: "#fff",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  subheading: {
    textAlign: "center",
    color: "#a89fc4",
    fontSize: "1rem",
    marginBottom: "2.5rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
    height: "100%",
    cursor: "pointer",
  },
  cardHover: {
    transform: "translateY(-6px)",
    boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
    borderColor: "rgba(168,128,255,0.5)",
  },
  cardImg: {
    height: "200px",
    objectFit: "cover",
    filter: "brightness(0.85)",
    transition: "filter 0.3s ease",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    padding: "1.4rem",
  },
  cardTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: "1.15rem",
    fontWeight: "700",
    color: "#f0ecff",
    marginBottom: "0.5rem",
    lineHeight: "1.4",
  },
  cardText: {
    color: "#b0a8c8",
    fontSize: "0.88rem",
    lineHeight: "1.6",
    fontFamily: "'Helvetica Neue', sans-serif",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    flex: 1,
    marginBottom: "1.2rem",
  },
  btnView: {
    background: "transparent",
    border: "1px solid rgba(168,128,255,0.6)",
    color: "#c4aeff",
    borderRadius: "8px",
    fontSize: "0.8rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.05em",
    padding: "6px 14px",
    transition: "all 0.2s ease",
  },
  btnEdit: {
    background: "transparent",
    border: "1px solid rgba(100,220,150,0.5)",
    color: "#7de8a8",
    borderRadius: "8px",
    fontSize: "0.8rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.05em",
    padding: "6px 12px",
    marginRight: "6px",
    transition: "all 0.2s ease",
  },
  btnDelete: {
    background: "transparent",
    border: "1px solid rgba(255,100,100,0.5)",
    color: "#ff8080",
    borderRadius: "8px",
    fontSize: "0.8rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.05em",
    padding: "6px 12px",
    transition: "all 0.2s ease",
  },
  divider: {
    width: "60px",
    height: "3px",
    background: "linear-gradient(90deg, #a080ff, #6050d0)",
    margin: "0 auto 2.5rem",
    borderRadius: "2px",
  },
  emptyState: {
    textAlign: "center",
    color: "#7a6a9a",
    fontFamily: "'Georgia', serif",
    fontSize: "1.1rem",
    padding: "3rem",
  },
  ownerBadge: {
    background: "rgba(168,128,255,0.15)",
    color: "#c4aeff",
    fontSize: "0.65rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "2px 8px",
    borderRadius: "20px",
    fontFamily: "'Helvetica Neue', sans-serif",
    border: "1px solid rgba(168,128,255,0.3)",
    display: "inline-block",
    marginBottom: "0.5rem",
  },
};

const BlogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    dispatch(deleteBlog(id));
  };

  const isOwner = (blog) => {
    const authorId = blog.author?._id || blog.author;
    const userId = user?._id || user?.id;
    return (
      user && (user.role === "admin" || String(userId) === String(authorId))
    );
  };

  if (loading) {
    return (
      <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" style={{ color: "#a080ff", width: "3rem", height: "3rem" }} />
          <p style={{ color: "#a89fc4", marginTop: "1rem", fontFamily: "sans-serif" }}>
            Loading blogs...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <Container>
          <Alert
            variant="danger"
            style={{
              background: "rgba(255,80,80,0.1)",
              border: "1px solid rgba(255,80,80,0.3)",
              color: "#ff8080",
              borderRadius: "12px",
              textAlign: "center",
              fontFamily: "sans-serif",
            }}
          >
            ⚠️ {error}
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Container>
        {/* Header */}
        <h2 style={styles.heading}>All Blogs</h2>
        <p style={styles.subheading}>Explore stories, ideas & insights</p>
        <div style={styles.divider} />

        {/* Grid */}
        <Row className="g-4">
          {blogs.length === 0 ? (
            <Col>
              <div style={styles.emptyState}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
                No blogs found. Be the first to write one!
              </div>
            </Col>
          ) : (
            blogs.map((blog) => (
              <Col md={4} sm={6} key={blog._id}>
                <HoverCard blog={blog} isOwner={isOwner} navigate={navigate} handleDelete={handleDelete} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

// Separate card component to handle hover state cleanly
const HoverCard = ({ blog, isOwner, navigate, handleDelete }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{ ...styles.card, ...(hovered ? styles.cardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          style={{
            ...styles.cardImg,
            filter: hovered ? "brightness(1)" : "brightness(0.85)",
          }}
          className="w-100"
        />
      )}

      <div style={styles.cardBody}>
        {isOwner(blog) && (
          <span style={styles.ownerBadge}>✦ Your Post</span>
        )}

        <h5 style={styles.cardTitle}>{blog.title}</h5>
        <p style={styles.cardText}>{blog.content}</p>

        {/* Actions */}
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <button
            style={styles.btnView}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(168,128,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
            onClick={() => navigate(`/blogs/${blog._id}`)}
          >
            👁 Read
          </button>

          {isOwner(blog) && (
            <div>
              <button
                style={styles.btnEdit}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(100,220,150,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
                onClick={() => navigate(`/editblog/${blog._id}`)}
              >
                ✏️ Edit
              </button>
              <button
                style={styles.btnDelete}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,100,100,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
                onClick={() => handleDelete(blog._id)}
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
