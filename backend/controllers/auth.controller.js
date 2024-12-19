import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utilities/generateToken.js";


export const signup = async(req,res) => {
    try {
        // console.log("Request Body:",req.body); // log the incoming request body to debug any issues
        const {fullName , userName , password , confirmPassword , gender} = req.body;
        
        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password!=confirmPassword){
            return res.status(400).json({error:"Passwords don't match"});
        }

        const existingUser = await User.findOne({userName});

        if(existingUser){
            return res.status(400).json({error:"Username already exists"});
        }

        // HASH PASSWORD HERE

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password,salt);

        //https://avatar-placeholder.iran.liara.run/
        
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
        const defaultProfilePic = gender === "male" ? boyProfilePic : girlProfilePic;


        const newUser = new User({
            fullName,
            userName,
            password : hashedPassword,
            gender,
            profilePic: defaultProfilePic,
        });

        // console.log("User before saving:", newUser);

        if(newUser){
            
            // Generate JWT token and set it in cookie
            generateTokenAndSetCookie(newUser._id , res);
            await newUser.save();
            

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                userName:newUser.userName,
                profilePic:newUser.profilePic,
            });
        }
        else{
            res.status(400).json({error:"Invalid user data"});
        }

    }catch (error) {

        console.log("Error in signup controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};


export const login = async(req,res) => {
    
    try{

        const {userName , password} = req.body;
        const loginUser = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password, loginUser?.password || "");

        if(!loginUser || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid credentials"});
        }

        generateTokenAndSetCookie(loginUser._id , res);

        res.status(200).json({
            _id:loginUser._id,
            fullName:loginUser.fullName,
            userName:loginUser.userName,
            profilePic:loginUser.profilePic,
        });

    }catch(error){
        console.log("Error in login controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}


export const logout = async(req,res) => {
    try {
        
        res.cookie("jwt" , "" , {maxAge:0});
        res.status(200).json({message:"Logged out successfully"});

    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

