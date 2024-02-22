import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utills/generateToken.js";


export const signupUser = async (req,res) =>{
    try {
        const {fullName,username,password,confirmPassword,gender} = req.body;
        console.log('checkpoint 1');
       if(password !== confirmPassword){
        return res.status(400).json({error : "Passwords don't match"});
       }
       console.log('checkpoint 2');
       const users = await User.findOne({username});
       console.log('checkpont 3===',users);
        if(users){
            console.log("checkpoint 3.5");
            return res.status(400).json({ error: "Username already exists" });
        }
        console.log('checkpoint 4');
        //HASH password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            username,
            fullName,
            password : hashedPassword,
            gender,
            profilepic : gender == "male" ? boyProfilePic : girlProfilePic
        });
        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                username : newUser.username,
                fullName : newUser.fullName,
                profilepic : newUser.profilepic
            });
        }
        else{
            res.status(400).json({error : "invalid data"});
        }
    } catch (error) {
        console.log("error in signup controller",error.message);
        res.status(500).json({
            error : "internal server error"
        })
    }
};

export const loginUser = async (req,res)=>{
   try {
     const {username, password} = req.body;
     const user = await User.findOne({username});
     const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
     if(!user || !isPasswordCorrect){
        return res.json({
            error : "Username or password Incorect"
        })
     }
     generateTokenAndSetCookie(user._id, res);
     res.status(200).json({
        _id : user._id,
        fullName : user.fullName,
        username : user.username,
        profilPic : user.profilepic
     })
   } catch (error) {
    console.log("error in login controller",error.message);
        res.status(500).json({
            error : "internal server error"
        })
   }
};

export const logoutuser = async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge : 0});
        res.status(200).json({
            message : "logged out successfully"
        })
    } catch (error) {
        console.log("error in logout controller",error.message);
        res.status(500).json({
            error : "internal server error"
        })
    }
};