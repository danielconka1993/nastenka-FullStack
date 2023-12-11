const savePost = require("express").Router();
const modelPost = require("../../models/post");

savePost.post("/save-post", (req, res) => {
  const { postName, autorName, autorEmail, postText } = req.body;

  const post = new modelPost({
    postName,
    autorName,
    autorEmail,
    postText,
  });

  post
    .save()
    .then((document) => {
      res.json({
        msg: `Post Add ${JSON.stringify(document)}`,
        success: true,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        // MongoDB duplicate key error
        res.status(400).json({
          msg: "Članek s tímto jménem již existuje",
          success: false,
        });
      } else {
        res.status(500).json({
          msg: "Registration failed",
          success: false,
        });
      }
    });
});

module.exports = savePost;
