const loginData = require("express").Router();
const UserModel = require("../../models/user");

loginData.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hledání uživatele dle e-mailu a hesla
    const user = await UserModel.findOne({ email, password });

    if (user) {
      // Vrátíme úspěšnou odpověď
      res.status(200).json({ 
        msg: "Přihlášení úspěšné", 
        user: [user], 
        success: true
      });
    } else {
      // Pokud uživatel neexistuje, vrátíme chybovou odpověď
      res.status(401).json({ msg: "Přihlašovací údaje zadány špatně" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Chyba serveru" });
  }
});

module.exports = loginData;