// src/Pages/About.jsx
import React from "react";
import img from "../assets/blog31.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};2

const imageVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const About = () => {
  return (
    <section
      className="pt-4 pb-4 d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #021a3a, #002f5c, #001b34)",
        color: "white",
      }}
    >
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="mb-4 text-warning"
          variants={itemVariants}
        >
          About Blogify
        </motion.h1>

        <motion.p className="lead" variants={itemVariants}>
          <strong>Blogify</strong> is a modern, user-friendly blogging platform
          designed to help writers, creators, and readers connect through
          meaningful content.
        </motion.p>

        <motion.p variants={itemVariants}>
          Whether you are an aspiring writer or an experienced blogger, Blogify
          provides the tools you need to publish, manage, and discover
          high-quality articles across various topics.
        </motion.p>

        <motion.h3 className="mt-4 text-warning" variants={itemVariants}>
          Our Vision
        </motion.h3>

        <motion.p variants={itemVariants}>
          Our vision is to build a trusted digital space where ideas, knowledge,
          and creativity can be shared freely. We aim to encourage thoughtful
          writing and make content accessible to everyone.
        </motion.p>

        <motion.h3 className="mt-4 text-warning" variants={itemVariants}>
          What We Offer
        </motion.h3>

        <motion.ul variants={itemVariants}>
          <li>Simple and secure blog creation with image uploads.</li>
          <li>Explore blogs across multiple categories.</li>
          <li>User authentication with protected content creation.</li>
          <li>Like and comment features to encourage engagement.</li>
          <li>Responsive design for all devices.</li>
        </motion.ul>

        <motion.h3 className="mt-4 text-warning" variants={itemVariants}>
          Built With Modern Technology
        </motion.h3>

        <motion.p variants={itemVariants}>
          Blogify is built using the <strong>MERN stack</strong> (MongoDB,
          Express, React, and Node.js), ensuring scalability, performance, and a
          smooth user experience.
        </motion.p>

        <motion.h3 className="mt-4 text-warning" variants={itemVariants}>
          Contact Us
        </motion.h3>

        <motion.p variants={itemVariants}>
          We value your feedback and suggestions. If you have any questions or
          would like to collaborate, feel free to reach out via our{" "}
          <Link to="/contact" className="text-warning">
            Contact page
          </Link>
          .
        </motion.p>
      </motion.div>

      {/* Animated Image */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        className="d-none d-md-block"
      >
        <img src={img} alt="Blog illustration" className="img-fluid" />
      </motion.div>
    </section>
  );
};

export default About;
