const User = require("../models/user")
const Message = require("../models/message")

exports.getAllUsersMessages = async (req,res)=>{
    try{
        const {currentUser} = req.params
        const messages = await Message.find().populate({
            path:"User",
            include:["firstName"]
        })
        return res.status(200).json({data:messages})
    }catch(err){

        res.status(500).json({msg:err.message})
    }
}