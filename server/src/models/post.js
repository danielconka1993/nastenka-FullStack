const mongoose = require("mongoose");

const postModel = new mongoose.Schema({
  postName: {
    type: String,
    require: true,
    unique: true,
  },
  autorName: {
    type: String,
    require: true,
  },
  autorEmail: {
    type: String,
    require: true,
  },
  postText: {
    type: String,
    require: true,
  },
});
//posts - určuje jméno kolekce
module.exports = mongoose.model("posts", postModel);
