const mongoose = require("mongoose");
const mongoURI =
"mongodb://localhost:27017/borhanbackend";
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connection successful to mongoose");
  });
};

module.exports = connectToMongo;