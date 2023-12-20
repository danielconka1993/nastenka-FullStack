const express = require('express');
const router = express.Router();
const modelUser = require('../../models/userHash');

router.post('/signupHash', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Kontrola, zda uživatel s daným e-mailem již existuje
        const existingUser = await modelUser.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                msg: "Email je již registrovaný",
                success: false,
            });
        }

        // Vytvoření nového uživatele
        const registration = new modelUser({
            name,
            email,
        });

         // Nastavení hesla + HASH
         registration.setPassword(password);

        const document = await registration.save();

        res.json({
            msg: `Registration complete ${JSON.stringify(document)}`,
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Registration failed",
            success: false,
        });
    }
});

module.exports = router;