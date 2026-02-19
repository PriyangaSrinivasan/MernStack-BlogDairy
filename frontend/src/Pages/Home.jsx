

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import imgpen from "../assets/home.png";

/* ─── Google Fonts injected via JS so no index.html edit needed ─── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap";
document.head.appendChild(fontLink);

/* ─── CSS injected once ─── */
const css = `
  :root {
    --navy-deep: #030e1c;
    --navy-mid:  #041428;
    --navy-soft: #06213f;
    --gold:      #e8b84b;
    --gold-pale: #f5d98a;
    --muted:     #7a95b0;
    --white:     #ffffff;
  }

  body {
    background: var(--navy-deep) !important;
    color: var(--white) !important;
    font-family: 'DM Sans', sans-serif !important;
    overflow-x: hidden;
  }

  /* noise overlay */
  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 200px;
    pointer-events: none;
    opacity: .35;
  }

  /* ── NAVBAR ── */
  .bd-navbar {
    position: fixed; top: 0; width: 100%; z-index: 999;
    padding: 20px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    backdrop-filter: blur(14px);
    background: rgba(3,14,28,0.75);
  }
  .bd-brand {
    font-family: 'Playfair Display', serif;
    font-size: 1.55rem; font-weight: 900;
    color: var(--gold) !important;
    text-decoration: none; letter-spacing: -0.5px;
  }
  .bd-brand span { color: var(--white); }
  .bd-navlink {
    font-size: .82rem; font-weight: 500;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--muted) !important; text-decoration: none;
    transition: color .2s;
  }
  .bd-navlink:hover { color: var(--gold) !important; }
  .bd-btn-nav {
    background: var(--gold); color: var(--navy-deep) !important;
    font-weight: 700; font-size: .82rem; letter-spacing: .5px;
    padding: 9px 24px; border-radius: 40px;
    text-transform: uppercase; text-decoration: none;
    transition: background .2s, transform .15s;
    display: inline-block;
  }
  .bd-btn-nav:hover { background: var(--gold-pale); transform: translateY(-1px); }

  /* ── HERO ── */
  .bd-hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 120px 0 80px;
    background:
      radial-gradient(ellipse 70% 60% at 80% 50%, rgba(232,184,75,.07) 0%, transparent 60%),
      linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 60%, #04253d 100%);
    position: relative; z-index: 1;
  }
  .bd-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: .72rem; font-weight: 600; letter-spacing: 2.5px;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 22px;
  }
  .bd-eyebrow::before { content:''; width:30px; height:1px; background:var(--gold); }
  .bd-h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 6vw, 5.2rem);
    font-weight: 900; line-height: 1.08; letter-spacing: -1px;
    color: var(--white);
  }
  .bd-h1 em { font-style: italic; color: var(--gold); }
  .bd-lead {
    font-size: 1rem; color: var(--muted);
    max-width: 460px; line-height: 1.85; margin-top: 18px;
  }
  .bd-btn-gold {
    background: var(--gold); color: var(--navy-deep) !important;
    font-weight: 700; font-size: .9rem; letter-spacing: .5px;
    padding: 14px 36px; border-radius: 50px;
    text-decoration: none; display: inline-block;
    transition: background .2s, transform .2s, box-shadow .2s;
    box-shadow: 0 0 0 0 rgba(232,184,75,0);
  }
  .bd-btn-gold:hover {
    background: var(--gold-pale); transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(232,184,75,.25);
  }
  .bd-btn-ghost {
    background: transparent; color: var(--white) !important;
    font-weight: 500; font-size: .9rem; letter-spacing: .5px;
    padding: 13px 36px; border-radius: 50px;
    text-decoration: none; display: inline-block;
    border: 1.5px solid rgba(255,255,255,.18);
    transition: border-color .2s, color .2s, transform .2s;
  }
  .bd-btn-ghost:hover { border-color: var(--gold); color: var(--gold) !important; transform: translateY(-2px); }

  /* hero image card */
  .bd-hero-card {
    width: 100%; max-width: 420px;
    aspect-ratio: 4/5; border-radius: 26px;
    overflow: hidden; position: relative;
    box-shadow: 0 40px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.06);
  }
  .bd-hero-card::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(3,14,28,.65) 100%);
  }
  .bd-hero-img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .bd-hero-placeholder {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #0a2a4a, #05182e, #0c3153);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 14px;
  }
  .bd-hero-placeholder p {
    font-size: .72rem; color: var(--muted);
    letter-spacing: 1.5px; text-transform: uppercase; opacity: .5;
  }
  .bd-badge {
    position: absolute; bottom: -14px; left: -18px;
    background: var(--gold); color: var(--navy-deep);
    border-radius: 14px; padding: 14px 18px;
    font-size: .72rem; font-weight: 700; letter-spacing: .5px;
    box-shadow: 0 8px 24px rgba(232,184,75,.3); z-index: 2; text-align: center;
  }
  .bd-badge::before { display: none !important; animation: none !important; content: none !important; }
  .bd-badge strong { display: block; font-size: 1.5rem; font-weight: 900; line-height: 1; }

  /* ── STATS ── */
  .bd-stats {
    background: var(--navy-soft);
    border-top: 1px solid rgba(255,255,255,.05);
    border-bottom: 1px solid rgba(255,255,255,.05);
    padding: 30px 0; position: relative; z-index: 1;
  }
  .bd-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 2rem; font-weight: 900; color: var(--gold); line-height: 1;
  }
  .bd-stat-lbl {
    font-size: .72rem; font-weight: 500; color: var(--muted);
    letter-spacing: 1.5px; text-transform: uppercase; margin-top: 4px;
  }
  .bd-stat-divider { width:1px; height:44px; background:rgba(255,255,255,.08); }

  /* ── SECTION COMMON ── */
  .bd-section { padding: 100px 0; position: relative; z-index: 1; }
  .bd-section-tag {
    font-size: .72rem; font-weight: 600; letter-spacing: 2.5px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 10px;
  }
  .bd-section-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.9rem, 3.5vw, 2.9rem);
    font-weight: 900; line-height: 1.15; color: var(--white);
  }
  .bd-section-sub {
    color: var(--muted); font-size: .98rem; line-height: 1.85;
    max-width: 560px;
  }

  /* ── WHY CARDS ── */
  .bd-why { background: linear-gradient(180deg, var(--navy-deep), var(--navy-mid)); }
  .bd-card {
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 20px; padding: 36px 30px; height: 100%;
    position: relative; overflow: hidden;
    transition: background .3s, border-color .3s, transform .3s;
    cursor: default;
  }
  .bd-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0; transition: opacity .3s;
  }
  .bd-card:hover {
    background: rgba(232,184,75,.05);
    border-color: rgba(232,184,75,.2);
    transform: translateY(-6px);
  }
  .bd-card:hover::before { opacity: 1; }
  .bd-card-num {
    font-family: 'Playfair Display', serif;
    font-size: 3.2rem; font-weight: 900;
    color: rgba(232,184,75,.12); line-height: 1; margin-bottom: 10px;
    transition: color .3s;
  }
  .bd-card:hover .bd-card-num { color: rgba(232,184,75,.28); }
  .bd-card-title { font-size: 1rem; font-weight: 700; color: var(--white); margin-bottom: 10px; }
  .bd-card-text { font-size: .9rem; color: var(--muted); line-height: 1.78; margin: 0; }

  /* ── TOPICS ── */
  .bd-topics { background: var(--navy-soft); }
  .bd-pill {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 50px; padding: 12px 26px;
    font-size: .87rem; font-weight: 600; color: var(--muted);
    cursor: pointer; white-space: nowrap;
    transition: all .25s; user-select: none;
  }
  .bd-pill:hover, .bd-pill.active {
    background: var(--gold); color: var(--navy-deep);
    border-color: var(--gold);
    box-shadow: 0 8px 20px rgba(232,184,75,.25);
  }

  /* ── CTA ── */
  .bd-cta {
    background:
      radial-gradient(ellipse 80% 55% at 50% 100%, rgba(232,184,75,.07) 0%, transparent 60%),
      linear-gradient(160deg, var(--navy-mid), var(--navy-deep));
  }
  .bd-cta-inner {
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 24px; padding: 60px 40px;
    max-width: 680px; margin: 0 auto; position: relative; overflow: hidden;
  }
  .bd-cta-inner::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(232,184,75,.5), transparent);
  }
  .bd-cta-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4vw, 3.6rem);
    font-weight: 900; line-height: 1.1; color: var(--white); margin-bottom: 16px;
  }
  .bd-cta-h2 em { color: var(--gold); font-style: italic; }
  .bd-cta-sub { font-size: .98rem; color: var(--muted); max-width: 460px; margin: 0 auto 36px; line-height: 1.8; }

  /* ── FOOTER ── */
  .bd-footer {
    background: var(--navy-deep);
    border-top: 1px solid rgba(255,255,255,.05);
    padding: 28px 0; text-align: center;
    font-size: .82rem; color: var(--muted); position: relative; z-index:1;
  }
  .bd-footer span { color: var(--gold); }

  /* ── FLOAT ── */
  @keyframes bd-float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-18px); }
  }
  .bd-float { animation: bd-float 5s ease-in-out infinite; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--navy-deep); }
  ::-webkit-scrollbar-thumb { background: rgba(232,184,75,.3); border-radius: 3px; }
`;

if (!document.getElementById("bd-styles")) {
  const style = document.createElement("style");
  style.id = "bd-styles";
  style.textContent = css;
  document.head.appendChild(style);
}

/* ─── ANIMATION VARIANTS ─── */
const fadeUp = {
  hidden:  { opacity: 0, y: 38 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = (delay = 0) => ({
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay } },
});
const floatAnim = {
  animate: {
    y: [0, -18, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ─── ANIMATED SECTION WRAPPER ─── */
function FadeSection({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={stagger(delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/* ─── DATA ─── */
const whyCards = [
  {
    num: "01",
    title: "Organize Your Thoughts",
    text: "Turn the noise in your head into clear, structured ideas that others can learn from and connect with.",
  },
  {
    num: "02",
    title: "Express Creativity",
    text: "Your perspective is unique. Writing gives it a voice and lets the world see things through your eyes.",
  },
  {
    num: "03",
    title: "Build Confidence",
    text: "Every published post is a small win. Watch yourself grow from hesitant writer to bold storyteller.",
  },
];

const topics = [
  { emoji: "✦", label: "Technology" },
  { emoji: "🌿", label: "Lifestyle" },
  { emoji: "✈️",  label: "Travel" },
  { emoji: "🏃",  label: "Health" },
  { emoji: "📚",  label: "Education" },
  { emoji: "💼",  label: "Business" },
  { emoji: "🎨",  label: "Design" },
  { emoji: "🍳",  label: "Food" },
];

/* ═══════════════════════════════════════
   HOME COMPONENT
═══════════════════════════════════════ */
const Home = () => {
  const [activeTopic, setActiveTopic] = React.useState(0);

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section className="bd-hero" id="hero">
        <div className="container">
          <div className="row align-items-center gy-5">

            {/* LEFT */}
            <div className="col-12 col-lg-7">
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <p className="bd-eyebrow">Your story starts here</p>
                <h1 className="bd-h1">
                  Discover<br /><em>Inspiring</em><br />Stories
                </h1>
                <p className="bd-lead">
                  Explore blogs from creators around the world.
                  Share your thoughts, ideas, and experiences with a community that listens.
                </p>
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <Link to="/createblog" className="bd-btn-gold">Start Writing</Link>
                  <Link to="/blogs"      className="bd-btn-ghost">Read Blogs</Link>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — floating card */}
            <div className="col-12 col-lg-5 d-flex justify-content-center">
              <motion.div
                className="position-relative"
                variants={floatAnim}
                animate="animate"
                style={{ maxWidth: 420, width: "100%" }}
              >
                <div className="bd-hero-card">
                  <img src={imgpen} alt="blogger writing" className="bd-hero-img" />
                </div>
                <div className="bd-badge">
                  <strong>2.4k</strong>
                  Active Writers
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bd-stats">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center gap-4 gap-md-5 flex-wrap">
            {[
              { num: "12k+", lbl: "Blogs Published" },
              { num: "2.4k", lbl: "Active Writers" },
              { num: "6",    lbl: "Topic Categories" },
              { num: "98%",  lbl: "Happy Readers" },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="bd-stat-divider d-none d-md-block" />}
                <FadeSection delay={i * 0.1}>
                  <div className="text-center">
                    <div className="bd-stat-num">{s.num}</div>
                    <div className="bd-stat-lbl">{s.lbl}</div>
                  </div>
                </FadeSection>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY WRITING ── */}
      <section className="bd-section bd-why" id="why">
        <div className="container">
          <div className="text-center mb-5">
            <FadeSection><p className="bd-section-tag">The Power of Writing</p></FadeSection>
            <FadeSection delay={0.1}><h2 className="bd-section-h2">Why Writing Matters</h2></FadeSection>
            <FadeSection delay={0.2}>
              <p className="bd-section-sub mx-auto mt-3">
                Writing helps you think clearly, express creatively,
                and grow personally over time.
              </p>
            </FadeSection>
          </div>

          <div className="row g-4">
            {whyCards.map((c, i) => (
              <FadeSection key={i} delay={i * 0.15} className="col-md-4">
                <div className="bd-card">
                  <div className="bd-card-num">{c.num}</div>
                  <div className="bd-card-title">{c.title}</div>
                  <p className="bd-card-text">{c.text}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOPICS ── */}
      <section className="bd-section bd-topics" id="topics">
        <div className="container">
          <div className="text-center mb-5">
            <FadeSection><p className="bd-section-tag">Explore Categories</p></FadeSection>
            <FadeSection delay={0.1}><h2 className="bd-section-h2">Write About What You Love</h2></FadeSection>
            <FadeSection delay={0.2}>
              <p className="bd-section-sub mx-auto mt-3">
                From tech to travel — pick your passion and start sharing.
              </p>
            </FadeSection>
          </div>

          <FadeSection delay={0.15}>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {topics.map((t, i) => (
                <motion.div
                  key={i}
                  className={`bd-pill ${activeTopic === i ? "active" : ""}`}
                  onClick={() => setActiveTopic(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {t.emoji} {t.label}
                </motion.div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bd-section bd-cta" id="cta">
        <div className="container">
          <FadeSection>
            <div className="bd-cta-inner text-center">
              <p className="bd-section-tag">Ready to Begin?</p>
              <h2 className="bd-cta-h2">
                Begin Your<br /><em>Writing Journey</em>
              </h2>
              <p className="bd-cta-sub">
                Your ideas deserve space. Join thousands of writers sharing
                what they know, feel, and imagine.
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Link to="/createblog" className="bd-btn-gold">Create a Blog →</Link>
                <Link to="/blogs"      className="bd-btn-ghost">Explore Posts</Link>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

    </div>
  );
};

export default Home;