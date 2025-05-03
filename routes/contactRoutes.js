const express = require("express");
const router = express.Router();

// Route GET pour la page Contact
router.get("/contact", (req, res) => {
  res.render("contact", { pageTitle: "Contact" });
});

module.exports = router;
