const User = require("../models/user")
const Message = require("../models/message")
const mongoose = require("mongoose")
exports.getAllUsersMessages = async (req,res)=>{
    try{
        const messages = await Message.find().populate('user_id',{firstname:1,lastname:1})
        console.log("req user",req.userId)
        const currentUser = await User.findById(req.userId)
        if(!currentUser) return res.status(404).json({msg:"User not found"})
        
        const formattedMessages = messages.map((el) => {
            // console.log("el", el)
            return {
                firstname: el.user_id.firstname,
                lastname: el.user_id.lastname,
                message: el.text,
                currentUserMessage: new mongoose.Types.ObjectId(el.user_id._id).equals(new mongoose.Types.ObjectId(currentUser._id)) ? "yes":"no"
            };
            });

    
        console.log('for',formattedMessages)
        
        return res.status(200).json({data:formattedMessages})
    }catch(err){

        res.status(500).json({msg:err.message})
    }
}

exports.addNewMessage= async(req,res)=>{
    try{
      const {text} = req.body
      const userId="665a4446849112d4de6cd650"
      console.log("user id",userId)
      const currentUser = await User.findById(userId)
      if(!currentUser) return res.status(404).json({msg:"User not found"})
      const newMessage = new Message({text,user_id:userId})
      const savedMessage = await newMessage.save()
      return res.status(201).json({msg:"Message inserted",data:savedMessage})
    }catch(err){

        res.status(500).json({msg:err.message})
    }
}