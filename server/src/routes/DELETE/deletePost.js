const route = require("express").Router();
const modelPost = require("../../models/post");

route.delete("/delete-post", async (req, res) => {
    try{
        const { _id, autorEmail } = req.body;
        const post = await modelPost.find({ _id, autorEmail }); 

        // console.log(_id + " " + autorEmail)
        // console.log(post)
        
        if(post){
            // await post.delete();// Smazání příspěvku
            await modelPost.deleteOne({ _id, autorEmail }); // Použijte deleteOne pro smazání


            res.status(200).json({
                msg:"Přispevěk Odstraněn",
                success:true
            })        
        }else{
            res.status(400).json({ msg: "Nejste Autorem Příšpeveku. Přispěvěk NEondstraněn."})
        }
    } catch(err) {
        res.status(500).send({ msg: `Chyba: ${err}` })
    }
})

module.exports = route;