const express = require("express");
const router = express.Router();

// Middleware d'erreurs internes (500)
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Quelque chose s'est mal passé !");
});

// Middleware de route non trouvée (404)
router.use((req, res) => {
  res.status(404).send("Page non trouvée");
});

module.exports = router;
