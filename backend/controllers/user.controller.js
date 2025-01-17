import User from "../models/user.model.js";


export const getUsersForSidebar = async (req,res) => {

    try {
        
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id:{ $ne:loggedInUserId } }).select(["-password","-fullName","-gender","-ProfilePic"]); //find all users except the logged in user

        res.status(200).json(filteredUsers); // send the filtered users to the client


    } catch (error) {
        console.log("Error in getUsersForSidebar Controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}