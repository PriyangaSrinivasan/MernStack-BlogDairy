
// src/Pages/About.jsx
import React from "react";
import img from "../assets/blog31.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ─── inject styles once ─── */
const css = `
  .bd-about {
    min-height: 100vh;
    padding: 120px 0 80px;
    background:
      radial-gradient(ellipse 70% 50% at 80% 20%, rgba(232,184,75,.06) 0%, transparent 60%),
      radial-gradient(ellipse 50% 60% at 10% 80%, rgba(37,99,235,.07) 0%, transparent 60%),
      linear-gradient(160deg, #030e1c 0%, #041428 60%, #04253d 100%);
    position: relative; overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  /* top gold line */
  .bd-about::before {
    content: '';
    position: absolute; top: 0; left: 15%; right: 15%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(232,184,75,.35), transparent);
  }

  /* ── PAGE HEADER ── */
  .bd-about-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: .72rem; font-weight: 600; letter-spacing: 2.5px;
    text-transform: uppercase; color: #e8b84b; margin-bottom: 16px;
  }
  .bd-about-eyebrow::before { content:''; width:28px; height:1px; background:#e8b84b; }

  .bd-about-h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 900; line-height: 1.1; letter-spacing: -1px;
    color: #fff; margin-bottom: 20px;
  }
  .bd-about-h1 em { font-style: italic; color: #e8b84b; }

  .bd-about-lead {
    font-size: 1.05rem; color: #7a95b0; line-height: 1.85; max-width: 520px;
  }

  /* ── IMAGE CARD ── */
  .bd-about-img-wrap {
    position: relative; display: flex; justify-content: center;
  }
  .bd-about-img-card {
    width: 100%; max-width: 400px;
    border-radius: 24px; overflow: hidden;
    box-shadow: 0 40px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.06);
    position: relative;
  }
  .bd-about-img-card::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(3,14,28,.6) 100%);
  }
  .bd-about-img-card img { width:100%; height:100%; object-fit:cover; display:block; }

  /* floating stat pill */
  .bd-about-pill {
    position: absolute; bottom: -16px; right: -16px;
    background: #e8b84b; color: #030e1c;
    border-radius: 14px; padding: 14px 20px;
    font-size: .75rem; font-weight: 700; letter-spacing: .5px;
    box-shadow: 0 8px 24px rgba(232,184,75,.3); z-index: 2; text-align: center;
  }
  .bd-about-pill::before { display:none !important; animation:none !important; content:none !important; }
  .bd-about-pill strong { display:block; font-size:1.5rem; font-weight:900; line-height:1; }

  /* ── SECTION HEADINGS ── */
  .bd-about-tag {
    font-size: .68rem; font-weight: 700; letter-spacing: 2.5px;
    text-transform: uppercase; color: #e8b84b; margin-bottom: 8px;
  }
  .bd-about-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 900; color: #fff; line-height: 1.2; margin-bottom: 16px;
  }

  /* ── VISION CARD ── */
  .bd-vision-card {
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 20px; padding: 36px 32px;
    position: relative; overflow: hidden;
    transition: border-color .3s, background .3s;
  }
  .bd-vision-card::before {
    content: ''; position: absolute; top:0; left:0; right:0; height:2px;
    background: linear-gradient(90deg, transparent, #e8b84b, transparent);
  }

  /* ── OFFER ITEMS ── */
  .bd-offer-item {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 20px 24px;
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 14px;
    transition: background .25s, border-color .25s, transform .25s;
  }
  .bd-offer-item:hover {
    background: rgba(232,184,75,.05);
    border-color: rgba(232,184,75,.2);
    transform: translateX(6px);
  }
  .bd-offer-icon {
    width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
    background: rgba(232,184,75,.1); border: 1px solid rgba(232,184,75,.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
  }
  .bd-offer-text { font-size: .92rem; color: #7a95b0; line-height: 1.7; margin: 0; }
  .bd-offer-text strong { color: #fff; font-weight: 600; }

  /* ── TECH STACK BADGES ── */
  .bd-tech-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 50px; padding: 10px 20px;
    font-size: .85rem; font-weight: 600; color: #7a95b0;
    transition: all .25s;
  }
  .bd-tech-badge:hover {
    background: rgba(232,184,75,.08);
    border-color: rgba(232,184,75,.25);
    color: #e8b84b;
  }
  .bd-tech-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #e8b84b; opacity: .7;
  }

  /* ── CTA BANNER ── */
  .bd-about-cta {
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 20px; padding: 48px 40px;
    position: relative; overflow: hidden; text-align: center;
  }
  .bd-about-cta::before {
    content:''; position:absolute; top:0; left:0; right:0; height:1px;
    background: linear-gradient(90deg, transparent, rgba(232,184,75,.5), transparent);
  }

  /* ── BUTTONS ── */
  .bd-btn-gold {
    background: #e8b84b; color: #030e1c !important;
    font-weight: 700; font-size: .88rem; letter-spacing: .5px;
    padding: 13px 32px; border-radius: 50px;
    text-decoration: none; display: inline-block;
    transition: background .2s, transform .2s, box-shadow .2s;
  }
  .bd-btn-gold:hover {
    background: #f5d98a; transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(232,184,75,.25);
  }
  .bd-btn-ghost {
    background: transparent; color: #fff !important;
    font-weight: 500; font-size: .88rem;
    padding: 12px 32px; border-radius: 50px;
    text-decoration: none; display: inline-block;
    border: 1.5px solid rgba(255,255,255,.18);
    transition: border-color .2s, color .2s, transform .2s;
  }
  .bd-btn-ghost:hover { border-color: #e8b84b; color: #e8b84b !important; transform: translateY(-2px); }

  /* divider */
  .bd-about-divider {
    border: none; height: 1px;
    background: rgba(255,255,255,.06); margin: 60px 0;
  }
`;

if (!document.getElementById("bd-about-styles")) {
  const style = document.createElement("style");
  style.id = "bd-about-styles";
  style.textContent = css;
  document.head.appendChild(style);
}

/* ─── animation variants ─── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease: "easeOut", delay },
});

const fadeLeft = {
  initial:    { opacity: 0, x: 50 },
  whileInView:{ opacity: 1, x: 0 },
  viewport:   { once: true },
  transition: { duration: 0.75, ease: "easeOut" },
};

const floatAnim = {
  animate: {
    y: [0, -14, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ─── data ─── */
const offers = [
  { icon: "🖊️", title: "Easy Blog Creation",  text: "Simple and secure blog creation with image uploads and rich formatting." },
  { icon: "🗂️", title: "Category Exploration", text: "Explore blogs across multiple categories tailored to your interests." },
  { icon: "🔐", title: "Secure Auth",           text: "User authentication with protected content creation and role management." },
  { icon: "💬", title: "Engagement Features",   text: "Like and comment features to encourage community interaction." },
  { icon: "📱", title: "Fully Responsive",       text: "Beautiful, consistent experience across all devices and screen sizes." },
];

const techStack = [
  { label: "MongoDB",  emoji: "🍃" },
  { label: "Express",  emoji: "⚡" },
  { label: "React",    emoji: "⚛️" },
  { label: "Node.js",  emoji: "🟢" },
];

/* ════════════════════════════════
   ABOUT COMPONENT
════════════════════════════════ */
const About = () => {
  return (
    <section className="bd-about">
      <div className="container">

        {/* ══ HERO ROW ══ */}
        <div className="row align-items-center gy-5 mb-5">

          {/* LEFT — text */}
          <div className="col-12 col-lg-7">
            <motion.div {...fadeUp(0)}>
              <p className="bd-about-eyebrow">Who we are</p>
              <h1 className="bd-about-h1">
                About <em>BlogDiary</em>
              </h1>
              <p className="bd-about-lead">
                A modern, user-friendly blogging platform designed to help writers,
                creators, and readers connect through meaningful content — one story at a time.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/createblog" className="bd-btn-gold">Start Writing</Link>
                <Link to="/contact"    className="bd-btn-ghost">Contact Us</Link>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — image */}
          <div className="col-12 col-lg-5 d-flex justify-content-center">
            <motion.div
              className="bd-about-img-wrap"
              variants={floatAnim}
              animate="animate"
              style={{ maxWidth: 400, width: "100%" }}
            >
              <div className="bd-about-img-card">
                <img src={img} alt="Blog illustration" />
              </div>
              <div className="bd-about-pill">
                <strong>5k+</strong>
                Stories Shared
              </div>
            </motion.div>
          </div>

        </div>

        <hr className="bd-about-divider" />

        {/* ══ VISION + OFFERS ROW ══ */}
        <div className="row g-5 align-items-start">

          {/* VISION */}
          <div className="col-12 col-lg-5">
            <motion.div {...fadeUp(0)}>
              <p className="bd-about-tag">Our Purpose</p>
              <h2 className="bd-about-h2">Our Vision</h2>
            </motion.div>
            <motion.div className="bd-vision-card" {...fadeUp(0.1)}>
              <p style={{ color: "#7a95b0", fontSize: ".95rem", lineHeight: 1.85, margin: 0 }}>
                Our vision is to build a trusted digital space where ideas, knowledge,
                and creativity can be shared freely. We aim to encourage thoughtful
                writing and make content accessible to everyone — regardless of background or experience.
              </p>
            </motion.div>

            {/* Tech stack */}
            <motion.div className="mt-4" {...fadeUp(0.2)}>
              <p className="bd-about-tag mt-4">Built With</p>
              <div className="d-flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <span key={t.label} className="bd-tech-badge">
                    <span className="bd-tech-dot" />
                    {t.emoji} {t.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* OFFERS */}
          <div className="col-12 col-lg-7">
            <motion.div {...fadeUp(0)}>
              <p className="bd-about-tag">Features</p>
              <h2 className="bd-about-h2">What We Offer</h2>
            </motion.div>
            <div className="d-flex flex-column gap-3 mt-3">
              {offers.map((o, i) => (
                <motion.div key={i} className="bd-offer-item" {...fadeUp(i * 0.1)}>
                  <div className="bd-offer-icon">{o.icon}</div>
                  <p className="bd-offer-text">
                    <strong>{o.title} — </strong>{o.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        <hr className="bd-about-divider" />

        {/* ══ BOTTOM CTA ══ */}
        <motion.div className="bd-about-cta" {...fadeUp(0)}>
          <p className="bd-about-tag">Get In Touch</p>
          <h2 className="bd-about-h2" style={{ maxWidth: 500, margin: "0 auto 16px" }}>
            Have questions or ideas?
          </h2>
          <p style={{ color: "#7a95b0", fontSize: ".95rem", maxWidth: 460, margin: "0 auto 32px", lineHeight: 1.8 }}>
            We value your feedback and suggestions. Reach out via our Contact page
            and let's build something great together.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/contact" className="bd-btn-gold">Contact Us →</Link>
            <Link to="/blogs"   className="bd-btn-ghost">Explore Blogs</Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;