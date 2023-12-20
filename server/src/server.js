const express = require("express");
const app = express(); // 1 server 
const PORT = process.env.PORT || 5000; // 1 server 
const cors = require("cors"); // 5 front-end

const db = require("./connectDB"); // 2 connectDB

// Ochrana Backendu
const jwtMiddleware = require('./middleware/jwtMiddleware'); //
app.use(jwtMiddleware.verifyToken.unless({ path: ['/loginHash', "/get-posts"] })); // musí byt zde, nad ostatními app.

// CORS middleware
app.use("/",cors()); // 5 Front-end



// Routy - načtení
// const saveRegistration = require("./routes/POST/saveRegistration");
// const loginData = require("./routes/POST/loginData")
const savePost = require("./routes/POST/savePost")
const getPosts = require("./routes/GET/getPosts")
const saveComment = require("./routes/POST/saveComment")
const getComments = require("./routes/GET/getComments")
const deletePost = require("./routes/DELETE/deletePost")
const putPost = require("./routes/PUT/putPost")
const deleteComment = require("./routes/DELETE/deleteComment")
const putComment = require("./routes/PUT/putComment")

const loginDataHash = require("./routes/Hash/loginData")
const registrationHash = require("./routes/Hash/saveRegistration")


app.get("/",(req,res) => { // 1 server 
    res.send("Hlavni stranka");
});
app.listen(PORT, (err) => { // 1 server 
    console.log(`Server běží na portu ${PORT}!`);
});

// --------------------------

db.connect(); // 2 connectDB

app.use(express.json({extended:false})); // 2,5 Midleware for easy Routes

// app.use("/",cors()); // 5 Front-end
// app.use(jwtMiddleware);

// Routes in progres
// app.use("/", saveRegistration); 
// app.use("/", loginData) 
app.use("/", savePost)
app.use("/", getPosts)
app.use("/", saveComment)
app.use("/", getComments)
app.use("/", deletePost)
app.use("/", putPost)
app.use("/", deleteComment)
app.use("/", putComment)

app.use("/", loginDataHash)
app.use("/", registrationHash)

