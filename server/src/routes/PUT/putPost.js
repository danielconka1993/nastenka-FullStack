// const route = require("express").Router();
// const modelPost = require("../../models/post");

// route.put("/put-post", async (req, res) => {
//     try {
//         const { _id, autorEmail, postName, postText } = req.body;

//         // Najdi příspěvek podle _id a autorEmail
//         const post = await modelPost.findOne({ _id, autorEmail });

//         if (post) {
//             // Aktualizuj hodnoty příspěvku
//             post.postName = postName;
//             post.postText = postText;

//             // Ulož změny do databáze
//             await post.save();

//             res.status(200).json({
//                 msg: "Příspěvek byl úspěšně aktualizován",
//                 success: true
//             });
//         } else {
//             res.status(400).json({ msg: "Příspěvek nebyl nalezen", success: false });
//         }
//     } catch (err) {
//         res.status(500).json({ msg: `Chyba: ${err}`, success: false });
//     }
// });

// module.exports = route;

const route = require("express").Router();
const modelPost = require("../../models/post");

route.put("/put-post", async (req, res) => {
    try {
      const { _id, autorEmail, postName, postText } = req.body;
  
      // Zde by mělo být ošetření, zda je `_id` ve správném formátu atd.
  
      const post = await modelPost.findOne({ _id, autorEmail });
  
      if (post) {
        // Aktualizujte pouze pole, která jsou obsažena v těle požadavku
        post.postName = postName || post.postName;
        post.postText = postText || post.postText;
  
        // Uložte aktualizovaný příspěvek
        await post.save();
  
        res.status(200).json({
          msg: "Příspěvek aktualizován",
          success: true,
        });
      } else {
        res.status(400).json({ msg: "Příspěvek neexistuje", success: false });
      }
    } catch (err) {
      res.status(500).json({ msg: `Chyba: ${err}`, success: false });
    }
  });

  module.exports = route;