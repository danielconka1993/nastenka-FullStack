const mongoose = require("mongoose");

const commentModel = new mongoose.Schema({
  postId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("comments", commentModel);
