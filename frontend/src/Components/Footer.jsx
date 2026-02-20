

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// /* ─── inject styles once ─── */
// const css = `
//   .bd-footer {
//     background:
//       radial-gradient(ellipse 80% 50% at 50% 100%, rgba(232,184,75,.06) 0%, transparent 60%),
//       linear-gradient(180deg, #041428 0%, #030e1c 100%);
//     border-top: 1px solid rgba(255,255,255,0.06);
//     font-family: 'DM Sans', sans-serif;
//     color: #fff;
//     position: relative;
//     overflow: hidden;
//   }

//   /* subtle top gold line */
//   .bd-footer::before {
//     content: '';
//     position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
//     background: linear-gradient(90deg, transparent, rgba(232,184,75,.4), transparent);
//   }

//   /* brand */
//   .bd-foot-brand {
//     font-family: 'Playfair Display', serif;
//     font-size: 1.7rem; font-weight: 900;
//     color: #e8b84b; letter-spacing: -0.5px;
//     text-decoration: none;
//   }
//   .bd-foot-brand span { color: #fff; }
//   .bd-foot-tagline {
//     font-size: .9rem; line-height: 1.75;
//     color: #7a95b0; max-width: 280px; margin-top: 10px;
//   }

//   /* section heading */
//   .bd-foot-heading {
//     font-size: .72rem; font-weight: 700;
//     letter-spacing: 2.5px; text-transform: uppercase;
//     color: #e8b84b; margin-bottom: 20px;
//   }

//   /* nav links */
//   .bd-foot-link {
//     display: inline-flex; align-items: center; gap: 8px;
//     color: #7a95b0; text-decoration: none;
//     font-size: .9rem; font-weight: 400;
//     transition: color .2s, gap .2s;
//     margin-bottom: 12px;
//   }
//   .bd-foot-link::before {
//     content: '→';
//     font-size: .7rem; opacity: 0;
//     transition: opacity .2s, transform .2s;
//     transform: translateX(-6px);
//   }
//   .bd-foot-link:hover { color: #e8b84b; gap: 12px; }
//   .bd-foot-link:hover::before { opacity: 1; transform: translateX(0); }

//   /* newsletter */
//   .bd-foot-input {
//     background: rgba(255,255,255,.04) !important;
//     border: 1px solid rgba(255,255,255,.1) !important;
//     border-radius: 50px 0 0 50px !important;
//     color: #fff !important;
//     font-size: .88rem !important;
//     padding: 11px 20px !important;
//     outline: none !important;
//     transition: border-color .2s !important;
//   }
//   .bd-foot-input::placeholder { color: #7a95b0 !important; }
//   .bd-foot-input:focus { border-color: rgba(232,184,75,.4) !important; box-shadow: none !important; }
//   .bd-foot-subscribe {
//     background: #e8b84b; color: #030e1c;
//     border: none; border-radius: 0 50px 50px 0;
//     font-size: .82rem; font-weight: 700;
//     letter-spacing: .8px; text-transform: uppercase;
//     padding: 11px 22px; cursor: pointer;
//     transition: background .2s, transform .15s;
//     white-space: nowrap;
//   }
//   .bd-foot-subscribe:hover { background: #f5d98a; }

//   /* social icons */
//   .bd-social-btn {
//     width: 40px; height: 40px; border-radius: 50%;
//     background: rgba(255,255,255,.04);
//     border: 1px solid rgba(255,255,255,.08);
//     display: flex; align-items: center; justify-content: center;
//     color: #7a95b0; font-size: 1rem; text-decoration: none;
//     transition: background .2s, border-color .2s, color .2s, transform .2s;
//   }
//   .bd-social-btn:hover {
//     background: rgba(232,184,75,.12);
//     border-color: rgba(232,184,75,.3);
//     color: #e8b84b;
//     transform: translateY(-3px);
//   }

//   /* divider */
//   .bd-foot-divider {
//     border: none; height: 1px;
//     background: rgba(255,255,255,.06);
//     margin: 40px 0 28px;
//   }

//   /* bottom bar */
//   .bd-foot-copy { font-size: .82rem; color: #7a95b0; }
//   .bd-foot-copy span { color: #e8b84b; }

//   .bd-foot-badge {
//     display: inline-flex; align-items: center; gap: 6px;
//     font-size: .72rem; color: #7a95b0; letter-spacing: .5px;
//   }
//   .bd-foot-badge::before {
//     content: ''; width: 6px; height: 6px; border-radius: 50%;
//     background: #22c55e;
//     box-shadow: 0 0 6px #22c55e;
//     animation: bd-pulse 2s ease-in-out infinite;
//   }
//   @keyframes bd-pulse {
//     0%,100% { opacity:1; } 50% { opacity:.4; }
//   }

//   /* toast */
//   .bd-toast {
//     position: fixed; bottom: 28px; right: 28px; z-index: 9999;
//     background: #e8b84b; color: #030e1c;
//     padding: 12px 24px; border-radius: 50px;
//     font-size: .85rem; font-weight: 700;
//     box-shadow: 0 8px 30px rgba(232,184,75,.3);
//     pointer-events: none;
//   }
// `;

// if (!document.getElementById("bd-footer-styles")) {
//   const style = document.createElement("style");
//   style.id = "bd-footer-styles";
//   style.textContent = css;
//   document.head.appendChild(style);
// }

// /* ─── data ─── */
// const links = [
//   { label: "Blogs",       to: "/blogs" },
//   { label: "Create Blog", to: "/createblog" },
//   { label: "About Us",    to: "/about" },
//   { label: "Contact",     to: "/contact" },
// ];

// const socials = [
//   { icon: "🌐", label: "Website",   href: "#" },
//   { icon: "𝕏",  label: "Twitter",   href: "#" },
//   { icon: "📸", label: "Instagram", href: "#" },
//   { icon: "💼", label: "LinkedIn",  href: "#" },
// ];

// /* ─── fade-up helper ─── */
// const fadeUp = (delay = 0) => ({
//   initial:   { opacity: 0, y: 28 },
//   whileInView: { opacity: 1, y: 0 },
//   viewport:  { once: true, margin: "-60px" },
//   transition: { duration: 0.6, ease: "easeOut", delay },
// });

// const Footer = () => {
//   const [email,   setEmail]   = useState("");
//   const [toasted, setToasted] = useState(false);

//   const handleSubscribe = () => {
//     if (!email.trim()) return;
//     setToasted(true);
//     setEmail("");
//     setTimeout(() => setToasted(false), 3000);
//   };

//   return (
//     <>
//       <footer className="bd-footer pt-5">
//         <div className="container">
//           <div className="row gy-5">

//             {/* ── BRAND ── */}
//             <motion.div className="col-12 col-md-4" {...fadeUp(0)}>
//               <Link to="/" className="bd-foot-brand">
//                 Blog<span>Diary</span>
//               </Link>
//               <p className="bd-foot-tagline">
//                 A modern platform to read, write, and share
//                 meaningful stories with the world.
//               </p>

//               {/* social icons */}
//               <div className="d-flex gap-2 mt-4">
//                 {socials.map((s) => (
//                   <a
//                     key={s.label}
//                     href={s.href}
//                     className="bd-social-btn"
//                     aria-label={s.label}
//                     title={s.label}
//                   >
//                     {s.icon}
//                   </a>
//                 ))}
//               </div>
//             </motion.div>

//             {/* ── EXPLORE ── */}
//             <motion.div className="col-6 col-md-2 offset-md-1" {...fadeUp(0.1)}>
//               <p className="bd-foot-heading">Explore</p>
//               <ul className="list-unstyled mb-0">
//                 {links.map((l) => (
//                   <li key={l.to}>
//                     <Link to={l.to} className="bd-foot-link">{l.label}</Link>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>

//             {/* ── LEGAL ── */}
//             <motion.div className="col-6 col-md-2" {...fadeUp(0.15)}>
//               <p className="bd-foot-heading">Company</p>
//               <ul className="list-unstyled mb-0">
//                 {["Privacy Policy", "Terms of Use", "Cookie Policy", "Support"].map((l) => (
//                   <li key={l}>
//                     <a href="#" className="bd-foot-link">{l}</a>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>

//             {/* ── NEWSLETTER ── */}
//             <motion.div className="col-12 col-md-3" {...fadeUp(0.2)}>
//               <p className="bd-foot-heading">Stay Updated</p>
//               <p style={{ fontSize: ".88rem", color: "#7a95b0", marginBottom: 16, lineHeight: 1.7 }}>
//                 Get the latest stories delivered straight to your inbox.
//               </p>
//               <div className="d-flex">
//                 <input
//                   type="email"
//                   className="form-control bd-foot-input"
//                   placeholder="your@email.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
//                 />
//                 <button className="bd-foot-subscribe" onClick={handleSubscribe}>
//                   Join
//                 </button>
//               </div>
//             </motion.div>

//           </div>

//           {/* ── DIVIDER ── */}
//           <hr className="bd-foot-divider" />

//           {/* ── BOTTOM BAR ── */}
//           <motion.div
//             className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-4 gap-3"
//             {...fadeUp(0.25)}
//           >
//             <p className="bd-foot-copy mb-0">
//               © {new Date().getFullYear()} <span>BlogDiary</span>. All rights reserved.
//             </p>

//             <p className="bd-foot-copy mb-0">
//               Built with ❤️ using <span>MERN Stack</span>
//             </p>
//           </motion.div>
//         </div>
//       </footer>

//       {/* ── SUBSCRIBE TOAST ── */}
//       {toasted && (
//         <motion.div
//           className="bd-toast"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 20 }}
//         >
//           ✓ You're subscribed!
//         </motion.div>
//       )}
//     </>
//   );
// };

// export default Footer;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const gold   = "#e8b84b";
const dark   = "#030e1c";
const muted  = "#7a95b0";
const dimmer = "#4a6080";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const links = [
  { label: "Blogs",       to: "/blogs" },
  { label: "Create Blog", to: "/createblog" },
  { label: "About Us",    to: "/about" },
  { label: "Contact",     to: "/contact" },
];

const socials = [
  { icon: "🌐", label: "Website",   href: "#" },
  { icon: "𝕏",  label: "Twitter",   href: "#" },
  { icon: "📸", label: "Instagram", href: "#" },
  { icon: "💼", label: "LinkedIn",  href: "#" },
];

const Footer = () => {
  const [email,   setEmail]   = useState("");
  const [toasted, setToasted] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setToasted(true);
    setEmail("");
    setTimeout(() => setToasted(false), 3000);
  };

  return (
    <>
      <footer
        className="position-relative overflow-hidden pt-5"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(232,184,75,.06) 0%, transparent 60%),
            linear-gradient(180deg, #041428 0%, #030e1c 100%)
          `,
          borderTop: "1px solid rgba(255,255,255,.06)",
          fontFamily: "'DM Sans', sans-serif",
          color: "#fff",
        }}>

        {/* gold top line */}
        <div className="position-absolute top-0"
          style={{ left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(232,184,75,.4), transparent)" }} />

        <div className="container">
          <div className="row gy-5">

            {/* ── BRAND ── */}
            <motion.div className="col-12 col-md-4" {...fadeUp(0)}>
              <Link to="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", fontWeight: 900, color: gold, letterSpacing: "-0.5px", textDecoration: "none" }}>
                Blog<span style={{ color: "#fff" }}>Diary</span>
              </Link>
              <p style={{ fontSize: ".9rem", lineHeight: 1.75, color: muted, maxWidth: 280, marginTop: 10 }}>
                A modern platform to read, write, and share meaningful stories with the world.
              </p>

              {/* social icons */}
              <div className="d-flex gap-2 mt-4">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} title={s.label}
                    onMouseEnter={() => setHoveredSocial(s.label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: hoveredSocial === s.label ? "rgba(232,184,75,.12)" : "rgba(255,255,255,.04)",
                      border: `1px solid ${hoveredSocial === s.label ? "rgba(232,184,75,.3)" : "rgba(255,255,255,.08)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: hoveredSocial === s.label ? gold : muted,
                      fontSize: "1rem", textDecoration: "none",
                      transform: hoveredSocial === s.label ? "translateY(-3px)" : "none",
                      transition: "all .2s",
                    }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── EXPLORE ── */}
            <motion.div className="col-6 col-md-2 offset-md-1" {...fadeUp(0.1)}>
              <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: gold, marginBottom: 20 }}>
                Explore
              </p>
              <ul className="list-unstyled mb-0">
                {links.map((l) => (
                  <li key={l.to} className="mb-3">
                    <Link to={l.to}
                      onMouseEnter={() => setHoveredLink(l.to)}
                      onMouseLeave={() => setHoveredLink(null)}
                      style={{
                        color: hoveredLink === l.to ? gold : muted,
                        textDecoration: "none",
                        fontSize: ".9rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: hoveredLink === l.to ? 12 : 8,
                        transition: "all .2s",
                      }}>
                      <span style={{ fontSize: ".7rem", opacity: hoveredLink === l.to ? 1 : 0, transition: "all .2s" }}>→</span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── COMPANY ── */}
            <motion.div className="col-6 col-md-2" {...fadeUp(0.15)}>
              <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: gold, marginBottom: 20 }}>
                Company
              </p>
              <ul className="list-unstyled mb-0">
                {["Privacy Policy", "Terms of Use", "Cookie Policy", "Support"].map((l) => (
                  <li key={l} className="mb-3">
                    <a href="#"
                      onMouseEnter={() => setHoveredLink(l)}
                      onMouseLeave={() => setHoveredLink(null)}
                      style={{
                        color: hoveredLink === l ? gold : muted,
                        textDecoration: "none",
                        fontSize: ".9rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: hoveredLink === l ? 12 : 8,
                        transition: "all .2s",
                      }}>
                      <span style={{ fontSize: ".7rem", opacity: hoveredLink === l ? 1 : 0, transition: "all .2s" }}>→</span>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── NEWSLETTER ── */}
            <motion.div className="col-12 col-md-3" {...fadeUp(0.2)}>
              <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: gold, marginBottom: 20 }}>
                Stay Updated
              </p>
              <p style={{ fontSize: ".88rem", color: muted, marginBottom: 16, lineHeight: 1.7 }}>
                Get the latest stories delivered straight to your inbox.
              </p>
              <div className="d-flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,.04)",
                    border: `1px solid ${focused ? "rgba(232,184,75,.4)" : "rgba(255,255,255,.1)"}`,
                    borderRight: "none",
                    borderRadius: "50px 0 0 50px",
                    color: "#fff",
                    fontSize: ".88rem",
                    padding: "11px 20px",
                    outline: "none",
                    transition: "border-color .2s",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
                <motion.button
                  onClick={handleSubscribe}
                  whileHover={{ background: "#f5d98a" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: gold,
                    color: dark,
                    border: "none",
                    borderRadius: "0 50px 50px 0",
                    fontSize: ".82rem",
                    fontWeight: 700,
                    letterSpacing: ".8px",
                    textTransform: "uppercase",
                    padding: "11px 22px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "background .2s",
                  }}>
                  Join
                </motion.button>
              </div>
            </motion.div>

          </div>
         {/* DIVIDER */}
          <div className="my-4" style={{ height: 1, background: "rgba(255,255,255,.06)" }} />

          {/* BOTTOM BAR */}
          <motion.div
            className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-4 gap-3"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}>

            <p className="mb-0" style={{ fontSize: ".82rem", color: muted }}>
              © {new Date().getFullYear()} <span style={{ color: gold }}>BlogDiary</span>. All rights reserved.
            </p>

            <p className="mb-0" style={{ fontSize: ".82rem", color: muted }}>
              Built with ❤️ using <span style={{ color: gold }}>MERN Stack</span>
            </p>

          </motion.div>

        </div> {/* container */}
    
      </footer>

      {/* ── TOAST ── */}
      {toasted && (
        <motion.div
          className="position-fixed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            bottom: 28, right: 28, zIndex: 9999,
            background: gold, color: dark,
            padding: "12px 24px", borderRadius: 50,
            fontSize: ".85rem", fontWeight: 700,
            boxShadow: "0 8px 30px rgba(232,184,75,.3)",
            pointerEvents: "none",
            fontFamily: "'DM Sans', sans-serif",
          }}>
          ✓ You're subscribed!
        </motion.div>
      )}
    </>
  );
};

export default Footer;