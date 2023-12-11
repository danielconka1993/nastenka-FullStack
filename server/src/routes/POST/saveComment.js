const saveCommit = require("express").Router();
const modelCommit = require("../../models/comment");

saveCommit.post("/save-comment", (req, res) => {
  const { postId, name, email, body } = req.body;

  const commit = new modelCommit({
    postId,
    name,
    email,
    body,
  });

  commit
    .save()
    .then((document) => {
      res.json({
        msg: `Comment Add ${JSON.stringify(document)}`,
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        msg: "Failed to save commit",
        success: false,
      });
    });
});

module.exports = saveCommit;
