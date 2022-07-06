const express = require("express");
const router = express.Router();

var { scoreOfDisease, Disease } = require("./../server/models/diseases.js");

// GET /app/structure
router.get("/app/structure", (req, res) => {
  res.status(200).render("structure", { pageTitle: "Structure" });
});

module.exports = router;
