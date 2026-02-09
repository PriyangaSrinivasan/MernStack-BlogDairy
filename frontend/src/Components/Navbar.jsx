import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo2.png";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/slices/authSlice";
import { motion } from "framer-motion";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const token =
    useSelector((state) => state.auth.token) ||
    localStorage.getItem("token") ||
    "";
  const userData = localStorage.getItem("user");
  const user =
    useSelector((state) => state.auth.user) ||
    (userData ? JSON.parse(userData) : null);
  const role = user?.role || "guest";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleNavClick = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 700);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    ...(token && (role === "admin" || role === "user")
      ? [{ name: "Create Blog", path: "/createblog" }]
      : []),
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          {" "}
          <Loader />{" "}
        </div>
      )}

      <motion.nav
        className="navbar navbar-expand-lg px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.4, duration: 0.6 },
          }}
        >
          <img className="logoimg" src={logo} width={150} alt="logo" />
        </motion.div>

        {/* Menu Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <MenuList className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3 fs-5">
            {menuItems.map((item, i) => (
              <motion.li
                key={item.name}
                className="nav-item"
                custom={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6 + i * 0.2 } }}
              >
                <NavButton onClick={() => handleNavClick(item.path)}>
                  <span className="hover-underline-animation">{item.name}</span>
                </NavButton>
              </motion.li>
            ))}
          </MenuList>
        </div>

        {/* Auth Section */}
        {/* AUTH SECTION */}
        <motion.div
          className="d-flex align-items-center gap-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 1.6, duration: 0.6 },
          }}
        >
          {token ? (
            <>
              <img
                src={
                  user?.picture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                }
                alt="profile"
                referrerPolicy="no-referrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid white",
                }}
              />
              <span className="text-light">
                {user?.name || "User"} <small>({role})</small>
              </span>
              {/* Plain button for Logout */}
              <button
                onClick={handleLogout}
                className="btn btn-outline-light btn-sm"
              >
                Logout
              </button>
            </>
          ) : (
            /* Plain button for Login */
            <button
              onClick={() => handleNavClick("/login")}
              className="btn btn-outline-light btn-sm"
            >
              Login
            </button>
          )}
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navbar;

// Styled Components
const MenuList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

const NavButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 20px;
  color: white;

  .hover-underline-animation {
    position: relative;
    color: white;
    font-size: 16px;
    letter-spacing: 2px;
  }

  .hover-underline-animation:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: white;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover .hover-underline-animation:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;
