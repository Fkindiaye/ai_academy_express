const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const courseRoutes = require("./coursesRoutes");
const subscriberRoutes = require("./subscriberRoutes");
const apiRoutes = require("./apiRoutes");
const homeRoutes = require("./homeRoutes");
const aboutRoutes = require("./aboutRoutes");
const contactRoutes = require("./contactRoutes"); // ✅ AJOUT ICI
const errorRoutes = require("./errorRoutes");

router.use("/", authRoutes);
router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", aboutRoutes);
router.use("/", contactRoutes); // ✅ AJOUT ICI
router.use("/", errorRoutes);

module.exports = router;
