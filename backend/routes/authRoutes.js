const express = require("express");
const router = express.Router();

// ✅ Import from controller
const {
  registerUser,
  loginUser,
  googleAuth,
} = require("../controllers/authController");

// ✅ Define routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth); // <--- This must be defined and imported

module.exports = router;
