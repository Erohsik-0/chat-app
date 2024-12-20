// export const sendMessage = async (req, res) => {
//     console.log("Message sent" , req.params.id);
//     res.status(200).json({message:"Message sent",id:req.params.id});
// }

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
 
export const sendMessage = async (req,res) => {

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

        if (newMessage){
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([newMessage.save(),conversation.save()]); //to save both conversation and message in parallel
        // newMessage should be first bcuz it has reference to conversation 
        //if after conversation, then conversation will be saved first and then newMessage will not be referenced to conversation

        res.status(201).json({newMessage});


    }catch (error) {
        console.log("Error in sendMessage Controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
        
    }
}

export const getMessage = async (req,res) => {
    try {
        
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages"); //Not reference but actual messages

        // console.log(conversation);

        if(!conversation){
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessage Controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}