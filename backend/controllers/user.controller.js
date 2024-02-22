import User from "../models/user.model.js";

export const getUSersForSidebar = async (req,res) =>{
    try {
        const loggedInUser = req.user._id;

        const allUSer = await User.find({_id : {$ne : loggedInUser}
        }).select("-password");
        res.status(200).json(allUSer);
    } catch (error) {
        console.log("error in getUSersForSidebar controller",error.message);
        res.status(500).json({
            error : "internal server error"
        })
    }
};