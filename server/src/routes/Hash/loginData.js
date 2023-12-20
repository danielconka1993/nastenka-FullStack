// --------------Bez JWT ----------------------------------------

// const express = require('express');
// const router = express.Router();
// const User = require('../../models/userHash');

// router.post('/loginHash', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             console.error("Neni uzivatel")
//             return res.status(400).send({
//                 message: "User not found."
//             });
//         }

//         if (user.validPassword(password)) {
//             return res.status(201).send({
//                 message: "User Logged In",
//                 user: [user], 
//                 success: true,
//             });
//         } else {
//             return res.status(400).send({
//                 message: "Wrong Password"
//             });
//         }
//     } catch (err) {
//         console.error(err);
//         return res.status(500).send({
//             message: "Internal Server Error"
//         });
//     }
// });

// module.exports = router;


// ------------------------------------------ s userID a email v tokenu 
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const router = express.Router();
// const User = require('../../models/userHash');

// router.post('/loginHash', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             console.error("Neni uzivatel")
//             return res.status(400).send({
//                 message: "User not found."
//             });
//         }

//         if (user.validPassword(password)) {
//             // Vytvoření JWT tokenu
//             const token = jwt.sign({ userId: user._id, email: user.email }, 'TajnyKlicProJWT', { expiresIn: '1h' });

//             return res.status(201).send({
//                 message: "User Logged In",
//                 user: [user],
//                 success: true,
//                 token: token // Poslání vytvořeného tokenu zpět klientovi 
//             });
//         } else {
//             return res.status(400).send({
//                 message: "Wrong Password"
//             });
//         }
//     } catch (err) {
//         console.error(err);
//         return res.status(500).send({
//             message: "Internal Server Error"
//         });
//     }
// });

// module.exports = router;

// ----------------------JWT bez ID a emailu 

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/userHash');

router.post('/loginHash', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.error("Neni uzivatel")
            return res.status(400).send({
                message: "User not found."
            });
        }

        if (user.validPassword(password)) {
            // Vytvoření JWT tokenu
            const token = jwt.sign({}, 'TajnyKlicProJWT', { expiresIn: '1h' });

            return res.status(201).send({
                message: "User Logged In",
                user: [user],
                success: true,
                token: token // Poslání vytvořeného tokenu zpět klientovi 
            });
        } else {
            return res.status(400).send({
                message: "Wrong Password"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
});

module.exports = router;