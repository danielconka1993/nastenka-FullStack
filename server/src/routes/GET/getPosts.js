const getPosts = require("express").Router();
const modelPost = require("../../models/post");

getPosts.get("/get-posts", (req, res) => {
  modelPost
    .find({})
    .then((docs) => {
      return res.json({
        msg: `Članky načteny Getem`,
        posts: docs,
      });
    })
    .catch((err) => {
      return res.json({
        msg: "Error " + err,
        documents: [],
      });
    });
});

module.exports = getPosts;
