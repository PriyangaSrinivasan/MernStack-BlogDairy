// Check if user has required roles
const authorizeRoles =(...roles)=>{

      return(req,res,next)=>{
        // make sure user is authenticated first
        if(!req,res){
            return res.status(401).json({message:"Not authorized"});
        }
        // check if users role is in allow roles
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"Forbidden:Access denied"})
        }
        // Role is allowed, proceed
        next();
      }
}

module.exports = authorizeRoles;