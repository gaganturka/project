const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://borhan:borhan@cluster0.whgyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connection successful to mongoose");
  });
};

module.exports = connectToMongo;
