const express = require("express")
const dotenv = require("dotenv")
const path = require("path");
const cors = require("cors")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const blogRoutes = require("./routes/blogRoutes")
const commentRoutes = require("./routes/commentRoutes")
const likeRoutes = require("./routes/likeRoutes")
const contactRoutes = require("./routes/contactRoutes")
// Load Environment Variables
dotenv.config()

// Connect to MongoDB
connectDB();

const app = express()
app.use(express.json());

// Middleware

app.use(
  cors({
    origin:  "http://localhost:5173", // allow both dev ports
    credentials: true,
  })
);



app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth",authRoutes)
app.use("/api/blogs",blogRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/likes",likeRoutes)
app.use("/api/contact",contactRoutes)
// Default route
app.get("/", (req, res) => {
  res.send("Blogify Backend is running successfully ✅");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

const PORT = process.env.PORT 

app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
    
})