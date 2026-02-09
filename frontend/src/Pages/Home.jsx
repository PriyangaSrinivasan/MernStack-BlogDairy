import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import imgpen from "../assets/himg1.png";
import imgpen1 from "../assets/imgpen.png";
import createimg from "../assets/createimg.png";

/* ================= ANIMATIONS ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const floatAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* ================= COMPONENT ================= */

const Home = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ================= HERO SECTION ================= */}
      <section
        className="text-light d-flex align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(120deg, #021a3a, #002f5c, #001b34)",
          padding: "60px 20px",
        }}
      >
        <div className="container" >
          <div className="row align-items-center gy-5">
            {/* LEFT CONTENT */}
            <motion.div
              className="col-12 col-lg-7"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h1 className="display-3 fw-bold">
                Discover Inspiring{" "}
                <span className="text-warning">Stories</span>
              </h1>

              <p className="lead mt-3">
                Explore blogs from creators around the world.  
                Share your thoughts, ideas, and experiences.
              </p>

              <div className="mt-4">
                <Link
                  to="/createblog"
                  className="btn btn-warning btn-lg me-3"
                >
                  Start Writing
                </Link>
                <Link to="/blogs" className="btn btn-outline-light btn-lg">
                  Read Blogs
                </Link>
              </div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              className="col-12 col-lg-5 text-center"
              variants={floatAnimation}
              animate="animate"
            >
              <img
                src={imgpen}
                alt="hero"
                className="img-fluid"
                style={{
                  maxWidth: "520px",
                  borderRadius: "20px",
                  boxShadow: "0 0 30px rgba(255,255,255,0.2)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= WHY WRITING ================= */}
      <section className="py-5 text-center" >
        <div className="container">
          <motion.h2
            className="fw-bold mb-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Why Writing Matters
          </motion.h2>

          <p className="text-muted mx-auto mb-5" style={{ maxWidth: "720px" }}>
            Writing helps you think clearly, express creatively, and grow
            personally over time.
          </p>

          <div className="row g-4">
            {[
              "Organize your thoughts",
              "Express creativity",
              "Build confidence",
            ].map((text, i) => (
              <motion.div
                key={i}
                className="col-md-4"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="p-4 bg-white shadow-sm rounded h-100">
                  <h5 className="fw-bold mb-2">Step {i + 1}</h5>
                  <p className="text-muted mb-0">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TOPICS ================= */}
      <section className="py-5 bg-light">
        <div className="container">
          <motion.h2
            className="fw-bold text-center mb-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Write About What You Love
          </motion.h2>

          <div className="row g-4 justify-content-center">
            {[
              "Technology",
              "Lifestyle",
              "Travel",
              "Health",
              "Education",
              "Business",
            ].map((topic, i) => (
              <motion.div
                key={i}
                className="col-6 col-md-4 col-lg-2 text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="p-3 bg-white rounded shadow-sm fw-semibold">
                  {topic}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section
        className="text-light"
        style={{
          background: "linear-gradient(120deg, #021a3a, #002f5c)",
          padding: "80px 20px",
        }}
      >
        <div className="container">
          <div className="row align-items-center text-center text-lg-start">
            {/* LEFT IMAGE */}
            <motion.div
              className="col-12 col-lg-3 mb-4 mb-lg-0 text-center"
              variants={floatAnimation}
              animate="animate"
            >
              <img
                src={imgpen1}
                alt="left"
                className="img-fluid"
                style={{ maxWidth: "380px" }}
              />
            </motion.div>

            {/* CENTER CONTENT */}
            <motion.div
              className="col-12 col-lg-6 text-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="fw-bold mb-3">Begin Your Writing Journey</h2>
              <p className="lead mb-4">Your ideas deserve space.</p>

              <Link to="/createblog" className="btn btn-warning btn-lg">
                Create a Blog
              </Link>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              className="col-12 col-lg-3 mt-4 mt-lg-0 text-center"
              variants={floatAnimation}
              animate="animate"
            >
              <img
                src={createimg}
                alt="right"
                className="img-fluid"
                style={{ maxWidth: "220px" }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
