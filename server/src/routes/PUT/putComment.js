const route = require("express").Router();
const modelPost = require("../../models/comment");

route.put("/put-comment", async (req, res) => {
    try {
      const { _id, postId, email, name, body } = req.body;
  
      // Zde by mělo být ošetření, zda je `_id` ve správném formátu atd.
  
      const post = await modelPost.findOne({ _id, postId, email });
  
      if (post) {
        // Aktualizujte pouze pole, která jsou obsažena v těle požadavku
        post.name = name || post.name;
        post.body = body || post.body;
  
        // Uložte aktualizovaný příspěvek
        await post.save();
  
        res.status(200).json({
          msg: "Komentář aktualizován",
          success: true,
        });
      } else {
        res.status(400).json({ msg: "Komentář neexistuje", success: false });
      }
    } catch (err) {
      res.status(500).json({ msg: `Chyba: ${err}`, success: false });
    }
  });

  module.exports = route;