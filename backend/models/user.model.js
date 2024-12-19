import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:[true, "Username is required"],
        unique:true,
        trim:true // Automatically removes white spaces from the beginning and end of the string
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male" , "female"]
    },
    profilePic:{
        type:String,
        default:""
    },
    //createdAt and updatedAt fields are automatically added by mongoose
} , {timestamps:true});

const User = mongoose.model("User" , userSchema);

export default User;