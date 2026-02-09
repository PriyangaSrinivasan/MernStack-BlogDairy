const jwt = require("jsonwebtoken")
const User = require("../models/authModel");

const protect = async(req,res,next)=>{
    let token;

    // check if Authorization header exists
    if(req.headers.authorization?.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            // Fetch full user details(excluding password)
            const user=await User.findById(decoded.id).select("-password");
            if(!user) return resizeBy.status(401).json({message:"User not found"});

            // Attach user to request
            req.user = user;
            next();

        }catch(error){
            console.error("Auth error:",error);
            return res.status(401).json({message:"Invalid or expired token"})
            
        }
    }else{
        return res.status(401).json({message:"No token provided"})
    }
};

module.exports = {protect}