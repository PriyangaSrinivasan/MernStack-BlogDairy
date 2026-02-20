// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Ensure uploads folder exists
// const uploadPath = path.join(__dirname, "../uploads");
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath);
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// // Allow only image files
// const fileFilter = (req, file, cb) => {
//   const allowed = /jpeg|jpg|png|gif/;
//   const ext = allowed.test(path.extname(file.originalname).toLowerCase());
//   const mime = allowed.test(file.mimetype);

//   if (ext && mime) cb(null, true);
//   else cb(new Error("Only image files allowed!"));
// };

// module.exports = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// });
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_images",       // folder name in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Export multer upload middleware
const upload = multer({ storage });

module.exports = upload;