const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper to generate JWT
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// ===================== REGISTER USER =====================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // First user becomes admin automatically
    const isFirstUser = (await User.countDocuments()) === 0;
    const userRole = isFirstUser ? "admin" : role || "user";

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ===================== LOGIN USER =====================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Body:", req.body);

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please enter email and password" });

    // Explicitly select password
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res
        .status(400)
        .json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("🔴 Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ===================== GOOGLE LOGIN =====================
const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token required" });

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Decoded payload:", payload);

    const { email, name, picture } = payload;
    if (!email) return res.status(400).json({ message: "Email required" });

    // Check if user exists or create new
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: undefined,
        picture,
        provider: "google",
        role: "user",
      });
    }

    // JWT for app
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .status(200)
      .json({ message: "Google login successful", token: jwtToken, user });
  } catch (error) {
    console.error("Google auth error:", error);
    res
      .status(500)
      .json({ message: "Google auth failed", error: error.message });
  }
};

module.exports = { registerUser, loginUser, googleAuth };
