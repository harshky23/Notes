const mongoose = require("mongoose")

const schema = mongoose.Schema

const noteSchema =  new schema({
    title:{
        type: String,
        required: true
    },
    subHead:{
        type:String,
        required:true
    },
    writeUp:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        require:true
    }
    }, 
    {timestamps :true }
    )
    
 module.exports = mongoose.model('note', noteSchema)