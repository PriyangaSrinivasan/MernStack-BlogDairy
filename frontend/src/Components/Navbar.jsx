
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/slices/AuthSlice";
import { motion, AnimatePresence } from "framer-motion";

/* ─── inject styles once ─── */
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

  .bd-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    padding: 0 32px;
    height: 70px;
    display: flex; align-items: center;
    background: rgba(3,14,28,0.82);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: background 0.3s, box-shadow 0.3s;
  }
  .bd-nav.scrolled {
    background: rgba(3,14,28,0.97);
    box-shadow: 0 4px 40px rgba(0,0,0,0.4);
  }

  /* logo */
  .bd-logo { height: 38px; object-fit: contain; }

  /* desktop menu */
  .bd-menu-item {
    position: relative;
    border: none; background: none; cursor: pointer;
    padding: 6px 2px; color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: .82rem; font-weight: 500;
    letter-spacing: 1.8px; text-transform: uppercase;
    transition: color .25s;
  }
  .bd-menu-item::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 1.5px; background: var(--gold);
    transform: scaleX(0); transform-origin: right;
    transition: transform .28s ease-out;
  }
  .bd-menu-item:hover, .bd-menu-item.active-link {
    color: var(--white);
  }
  .bd-menu-item:hover::after,
  .bd-menu-item.active-link::after {
    transform: scaleX(1); transform-origin: left;
  }

  /* auth */
  .bd-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    object-fit: cover; border: 2px solid var(--gold);
    box-shadow: 0 0 0 3px rgba(232,184,75,.15);
  }
  .bd-username {
    font-size: .82rem; color: var(--muted); white-space: nowrap;
  }
  .bd-username span { color: var(--gold); font-weight: 600; }
  .bd-btn-logout {
    background: transparent; border: 1.5px solid rgba(255,255,255,.15);
    color: var(--muted); font-size: .78rem; font-weight: 500;
    letter-spacing: 1px; text-transform: uppercase;
    padding: 7px 18px; border-radius: 40px; cursor: pointer;
    transition: border-color .2s, color .2s, transform .15s;
  }
  .bd-btn-logout:hover {
    border-color: rgba(232,184,75,.5); color: var(--gold);
    transform: translateY(-1px);
  }
  .bd-btn-login {
    background: var(--gold); color: var(--navy-deep) !important;
    border: none; font-size: .8rem; font-weight: 700;
    letter-spacing: .8px; text-transform: uppercase;
    padding: 9px 24px; border-radius: 40px; cursor: pointer;
    transition: background .2s, transform .15s, box-shadow .2s;
  }
  .bd-btn-login:hover {
    background: var(--gold-pale); transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(232,184,75,.25);
  }

  /* hamburger */
  .bd-hamburger {
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    gap: 5px; background: none; border: none; cursor: pointer;
    padding: 4px; z-index: 1100;
  }
  .bd-bar {
    width: 24px; height: 2px; border-radius: 2px;
    background: var(--white); transition: all .3s ease;
    transform-origin: center;
  }
  .bd-hamburger.open .bd-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .bd-hamburger.open .bd-bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .bd-hamburger.open .bd-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* mobile drawer */
  .bd-drawer {
    position: fixed; top: 70px; left: 0; right: 0;
    background: rgba(3,14,28,0.98);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding: 24px 32px 32px;
    z-index: 999;
    overflow: hidden;
  }
  .bd-drawer-item {
    display: block; width: 100%; text-align: left;
    background: none; border: none; cursor: pointer;
    padding: 14px 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem; font-weight: 500;
    color: var(--muted); letter-spacing: 1.5px; text-transform: uppercase;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: color .2s, padding-left .2s;
  }
  .bd-drawer-item:hover { color: var(--gold); padding-left: 8px; }
  .bd-drawer-auth { margin-top: 20px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }

  /* loader overlay */
  .loader-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(3,14,28,0.85);
    display: flex; align-items: center; justify-content: center;
  }

  /* push page content below fixed nav */
  body { padding-top: 70px !important; }
`;

if (!document.getElementById("bd-nav-styles")) {
  const style = document.createElement("style");
  style.id = "bd-nav-styles";
  style.textContent = css;
  document.head.appendChild(style);
}

/* ─── animation variants ─── */
const navVariant = {
  hidden:  { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const itemVariant = (i) => ({
  hidden:  { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.1, duration: 0.4 } },
});
const drawerVariant = {
  hidden:  { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.35, ease: "easeOut" } },
  exit:    { opacity: 0, height: 0,      transition: { duration: 0.25, ease: "easeIn"  } },
};
const drawerItemVariant = (i) => ({
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.05 + i * 0.07, duration: 0.35 } },
});

/* ════════════════════════════════
   NAVBAR COMPONENT
════════════════════════════════ */
const Navbar = () => {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const [loading,   setLoading]   = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  const token    = useSelector((s) => s.auth.token) || localStorage.getItem("token") || "";
  const userData = localStorage.getItem("user");
  const user     = useSelector((s) => s.auth.user) || (userData ? JSON.parse(userData) : null);
  const role     = user?.role || "guest";

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close drawer on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 992) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    dispatch(logout());
    navigate("/login");
  };

  const handleNavClick = (path) => {
    setMenuOpen(false);
    setLoading(true);
    setTimeout(() => { navigate(path); setLoading(false); }, 700);
  };

  const menuItems = [
    { name: "Home",        path: "/" },
    { name: "About",       path: "/about" },
    { name: "Blogs",       path: "/blogs" },
    ...(token && (role === "admin" || role === "user")
      ? [{ name: "Create Blog", path: "/createblog" }]
      : []),
    { name: "Contact", path: "/contact" },
  ];

  /* active link check */
  const isActive = (path) => window.location.pathname === path;

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      <motion.nav
        className={`bd-nav ${scrolled ? "scrolled" : ""}`}
        variants={navVariant}
        initial="hidden"
        animate="visible"
      >
        {/* ── LOGO ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5 } }}
          style={{ cursor: "pointer", flexShrink: 0 }}
          onClick={() => handleNavClick("/")}
        > 
              {/* ── NAVBAR ── */}
              {/* <nav className="bd-navbar">
                <div className="container d-flex align-items-center justify-content-between">
                 
                  <div className="d-flex align-items-center gap-4">
                    <a href="#why"    className="bd-navlink d-none d-md-inline">Why Write</a>
                    <a href="#topics" className="bd-navlink d-none d-md-inline">Topics</a>
                    <Link to="/createblog" className="bd-btn-nav">Start Writing</Link>
                  </div>
                </div>
              </nav> */}
               <a href="/" className="bd-brand">Blog<span>Diary</span></a>
          {/* <img className="bd-logo" src={logo} alt="BlogDiary logo" /> */}
        </motion.div>

        {/* ── DESKTOP MENU (center) ── */}
        <div className="d-none d-lg-flex align-items-center gap-4 mx-auto">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.name}
              className={`bd-menu-item ${isActive(item.path) ? "active-link" : ""}`}
              variants={itemVariant(i)}
              initial="hidden"
              animate="visible"
              whileTap={{ scale: 0.96 }}
              onClick={() => handleNavClick(item.path)}
            >
              {item.name}
            </motion.button>
          ))}
        </div>

        {/* ── DESKTOP AUTH ── */}
        <motion.div
          className="d-none d-lg-flex align-items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.8, duration: 0.5 } }}
        >
          {token ? (
            <>
              <img
                src={user?.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                alt="profile"
                referrerPolicy="no-referrer"
                className="bd-avatar"
              />
              <span className="bd-username">
                <span>{user?.name || "User"}</span>&nbsp;
                <small style={{ color: "var(--muted)", fontSize: ".72rem" }}>({role})</small>
              </span>
              <button className="bd-btn-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="bd-btn-login" onClick={() => handleNavClick("/login")}>
              Login
            </button>
          )}
        </motion.div>

        {/* ── HAMBURGER (mobile) ── */}
        <motion.button
          className={`bd-hamburger d-lg-none ms-auto ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
        >
          <span className="bd-bar" />
          <span className="bd-bar" />
          <span className="bd-bar" />
        </motion.button>
      </motion.nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="bd-drawer d-lg-none"
            variants={drawerVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {menuItems.map((item, i) => (
              <motion.button
                key={item.name}
                className="bd-drawer-item"
                variants={drawerItemVariant(i)}
                initial="hidden"
                animate="visible"
                onClick={() => handleNavClick(item.path)}
              >
                {item.name}
              </motion.button>
            ))}

            <div className="bd-drawer-auth">
              {token ? (
                <>
                  <img
                    src={user?.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                    alt="profile"
                    referrerPolicy="no-referrer"
                    className="bd-avatar"
                  />
                  <span className="bd-username">
                    <span>{user?.name || "User"}</span>&nbsp;
                    <small style={{ color: "var(--muted)", fontSize: ".72rem" }}>({role})</small>
                  </span>
                  <button className="bd-btn-logout" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <button className="bd-btn-login" onClick={() => handleNavClick("/login")}>
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
