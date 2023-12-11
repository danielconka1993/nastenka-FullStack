const express = require("express");
const getComments = express.Router();
const modelComment = require("../../models/comment");

getComments.get("/get-comment", (req, res) => {
  const postId = req.query.postId;

  if (!postId) {
    return res.status(400).json({
      msg: "Chybějící postId ve vyžádání.",
      comments: [],
    });
  }

  modelComment
    .find({ postId: postId })
    .then((docs) => {
      return res.json({
        msg: `Komentáře načteny Getem pro postId: ${postId}`,
        comments: docs,
      });
    })
    .catch((err) => {
      return res.json({
        msg: "Chyba " + err,
        comments: [],
      });
    });
});

module.exports = getComments;
