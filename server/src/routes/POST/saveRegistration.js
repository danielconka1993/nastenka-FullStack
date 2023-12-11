const saveRegistration = require("express").Router();
const modelUser = require("../../models/user");

saveRegistration.post("/save-registration", (req, res) => {
  const { name, email, password } = req.body;

  const registration = new modelUser({
    name,
    email,
    password,
  });

  registration
    .save()
    .then((document) => {
      res.json({
        msg: `Registration complete ${JSON.stringify(document)}`,
        success: true,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).json({
          msg: "Email je již registrovaný",
          success: false,
        });
      } else {
        res.status(500).json({
          msg: "Registration failed",
          success: false, // při neuspechu
        });
      }
    });
});

module.exports = saveRegistration;
