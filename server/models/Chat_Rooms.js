const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatRoomsSchema = new Schema({

  
    userId:{
        type:Schema.Types.ObjectId,
        ref:"borhanuser"
    },
    expertId:{
        type:Schema.Types.ObjectId,
        ref:"expertborhanuser",
    },
    practiceArea:{
     type:Schema.Types.ObjectId,
     ref:"practicearea"
    }


    
});


module.exports = mongoose.model("chatrooms", ChatRoomsSchema);
