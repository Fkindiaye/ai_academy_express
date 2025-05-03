// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Formulaire d'inscription
router.get("/signup", authController.signup);

// Traitement du formulaire d'inscription
router.post("/signup", authController.register, (req, res) => {
  res.redirect(res.locals.redirect);
});

// Formulaire de connexion
router.get("/login", authController.login);

// Traitement de la connexion
router.post("/login", authController.authenticate);

// Déconnexion
router.get("/logout", authController.logout);

module.exports = router;
