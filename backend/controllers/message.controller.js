import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req,res)=>{
    try {
        const {message} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants : {$all : [senderId, receiverId]}
        });
        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId, receiverId]
            });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        //await newMessage.save();
        //await conversation.save();

        await Promise.all([newMessage.save(), conversation.save()]);
        return res.status(201).json(newMessage);
    } catch(error) {
        console.log("error in sendMessage controller",error.message);
        res.status(500).json({
            error : "internal server error"
        })
    }
};

export const getMessage = async (req,res) =>{
    try {
        const {id : userTOChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants : {$all: [senderId, userTOChatId]}
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.log("error in getMessage controller",error.message);
        res.status(500).json({
            error : "internal server error"
        })
    }
};



