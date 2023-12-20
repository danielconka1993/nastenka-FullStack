const route = require("express").Router();
const modelComment = require("../../models/comment");

route.delete("/delete-comment", async (req, res) => {
    try{
        const {_id, postId, email} = req.body;
        const post = await modelComment.findOne({ _id, postId,  email });

        if(post){
            await modelComment.deleteOne({ _id, email, postId });

            res.status(200).json({
                msg: "Komentář Odstraněn",
                success: true
            })
        } else{
            res.status(400).json({
                msg: "Nejste Autorem Komentáře. Komentář Nesmazán"
            })
        }

    } catch (err){
        res.status(500).send({ msg: `Chyba: ${err}`})
    }
})

module.exports = route;