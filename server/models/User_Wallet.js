const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserWalletSchema = new Schema({

  date:{
      type:Date,
  },
  amount:{type:Number},
  


    
});


module.exports = mongoose.model("userwallet", UserWalletSchema);
