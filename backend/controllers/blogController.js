const Blog = require("../models/blogModel")


     // Create Blog
const createBlog = async(req,res)=>{
    try {
            let imagePath = "";

    // ✅ If an image is uploaded via multer
    // if (req.file) {
    //   imagePath = `/uploads/${req.file.filename}`; // store path as string
    // }
    if (req.file) {
      imagePath = req.file.path;  // Cloudinary gives full image URL
  }

    // ✅ If user gives direct image URL
    else if (req.body.image) {
      imagePath = req.body.image; // store URL as string
    }
        const newBlog = new Blog({
            title:req.body.title,
            content:req.body.content,
            category:req.body.category,
            author:req.user._id,
             image: imagePath 
        })
        const savedBlog =  await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        console.error("❌ Create Blog Error:", error.message);
        res.status(500).json({message:"Server error",error:error.message})
    }
};


        // Get All Blogs
const getBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find()
        .populate("author","name role")
        res.json(blogs);
    } catch (error) {
         console.error("❌ Error fetching blogs:", error.message);
        res.status(500).json({message:"Server error"})
    }
};

        // Get All By Id
// Get Blog by ID (with comments)
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email role")
      .populate({
        path: "comments",           // populate the virtual comments
        populate: { path: "user", select: "name email _id" }, // populate user name for each comment
        options: { sort: { createdAt: -1 } }       // optional: newest first
      })
      .populate({
          path:"likes",
          populate:{path:"user",select:"name email _id"}
      })

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    console.error("❌ Error fetching blog by ID:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


      
           // Update Blog
// Update Blog
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // 🔥 Safely extract author ID
    const authorId = blog.author._id
      ? blog.author._id.toString()
      : blog.author.toString();

    const userId = req.user._id.toString();

    // 🔐 Authorization check
    if (req.user.role !== "admin" && authorId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 📝 Update fields
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.category = req.body.category || blog.category;

    // 📷 If new image uploaded (Cloudinary)
    if (req.file) {
      blog.image = req.file.path;
    }

    const updatedBlog = await blog.save();

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Update Blog Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

 
                     // Delete Blog
const deleteBlog = async(req,res)=>{
    try {
        const blog = await Blog.findById(req.params.id);
         if(!blog) return res.status(404).json({message:"Blog not found"});

        if(req.user.role !== "admin" && blog.author.toString() !==req.user._id.toString()){
        return res.status(403).json({message:"Not authorized"})
       }

       await blog.deleteOne();
       res.json({message:"Blog deleted successfully" })
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
};

module.exports ={createBlog,getBlogById,getBlogs,updateBlog,deleteBlog}
