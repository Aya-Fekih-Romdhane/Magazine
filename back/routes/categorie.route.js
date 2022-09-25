const CategorieController = require("../controllers/CategorieController");

const express = require("express");

const router = express.Router();

router.post("/", CategorieController.CreateCatego);
router.get("/:id", CategorieController.getCatego);
router.delete("/:id", CategorieController.deleteCatego);
router.put("/:id", CategorieController.updateCatego);

module.exports = router;
