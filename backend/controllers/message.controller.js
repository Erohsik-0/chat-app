// export const sendMessage = async (req, res) => {
//     console.log("Message sent" , req.params.id);
//     res.status(200).json({message:"Message sent",id:req.params.id});
// }

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res) => {

    try {
     
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId , receiverId]} // find convo where participants array contains both sender and receiver id's
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            });
        }

        const newMessage = new Message({
            senderId,   //senderId:senderId
            receiverId, //receiverId:receiverId
            message     //message:message
        });

        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(),newMessage.save()]); //to save both conversation and message in parallel 

        if (newMessage){
            conversation.messages.push(newMessage._id);
        }

        res.status(201).json({newMessage});


    }catch (error) {
        console.log("Error in sendMessage Controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
        
    }
}