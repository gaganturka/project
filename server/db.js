const mongoose = require("mongoose");
// const mongoURI = "mongodb://localhost:27017/borhanbackend";
const mongoURI = "mongodb+srv://borhan:borhan@cluster0.veo0r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connection successful to mongoose");
  });
};

module.exports = connectToMongo;
