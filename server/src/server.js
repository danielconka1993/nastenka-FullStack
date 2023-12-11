const express = require("express"); // 1 server 
const app = express(); // 1 server 
const PORT = process.env.PORT || 5000; // 1 server 
const cors = require("cors"); // 5 front-end

const db = require("./connectDB"); // 2 connectDB

const saveRegistration = require("./routes/POST/saveRegistration");
const loginData = require("./routes/POST/loginData")
const savePost = require("./routes/POST/savePost")
const getPosts = require("./routes/GET/getPosts")
const saveComment = require("./routes/POST/saveComment")
const getComments = require("./routes/GET/getComments")


app.get("/",(req,res) => { // 1 server 
    res.send("Hlavni stranka");
});
app.listen(PORT, (err) => { // 1 server 
    console.log(`Server běží na portu ${PORT}!`);
});

// --------------------------

db.connect(); // 2 connectDB

app.use(express.json({extended:false})); // 2,5 Midleware for Routes

app.use("/",cors()); // 5 Front-end (musí být před Routes)

app.use("/", saveRegistration); // 3 POST registration
app.use("/", loginData) // 6 POST Login
app.use("/", savePost)
app.use("/", getPosts)
app.use("/", saveComment)
app.use("/", getComments)

