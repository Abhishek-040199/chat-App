import Jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.JWT;
        if(!token){
           return res.status(401).json({
                error : "unauthorized user - no token provided"
            });
        }
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                error : "unauthorized user - invalid token"
            })
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({error : "user not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("error in sendMessage controller",error.message);
        res.status(500).json({
            error : "internal server error"
        })
    }
};
export default protectRoute;