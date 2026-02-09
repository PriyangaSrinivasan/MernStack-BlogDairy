import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
     backgroundImage: "radial-gradient(circle at center right, rgb(8,7,30) 0%, rgb(8,7,30) 64%,rgb(7,8,44) 64%, rgb(7,8,44) 80%,rgb(6,10,32) 80%, rgb(6,10,32) 86%,rgb(8,6,24) 86%, rgb(8,6,24) 92%,rgb(7,7,22) 92%, rgb(7,7,22) 100%)",
        color: "#fff",
      }}
      className="pt-5"
    >
      <div className="container">
        <div className="row gy-4">

          {/* Brand */}
          <div className="col-md-4">
            <h4 className="fw-bold">📝 Blogify</h4>
            <p className="text-light opacity-75">
              A modern platform to read, write, and share meaningful stories.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-md-4">
            <h5 className="mb-3">Explore</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/blogs" className="text-light text-decoration-none">
                  Blogs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/createblog" className="text-light text-decoration-none">
                  Create Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-4">
            <h5 className="mb-3">Stay Updated</h5>
            <p className="opacity-75">Subscribe to our newsletter</p>
            <div className="d-flex">
              <input
                type="email"
                placeholder="Enter email"
                className="form-control me-2"
              />
              <button className="btn btn-outline-light">Subscribe</button>
            </div>
          </div>
        </div>

        <hr className="border-light opacity-25 mt-4" />

        {/* Bottom */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-3">
          <p className="mb-2 mb-md-0 opacity-75">
            © {new Date().getFullYear()} Blogify. All rights reserved.
          </p>

          <div className="d-flex gap-3 fs-5">
            <a href="#" className="text-light">🌐</a>
            <a href="#" className="text-light">🐦</a>
            <a href="#" className="text-light">📸</a>
            <a href="#" className="text-light">💼</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
