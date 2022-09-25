const express = require("express");

var multer = require("multer");

var fs = require("fs");
var path = require("path");

const router = express.Router();

//  Storing uploaded files
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "image"
);

const ArticleController = require("../controllers/ArticleController");

router.get("/", ArticleController.getArticles);
router.post("/", upload, ArticleController.AddArticle);
router.get("/:id", ArticleController.getArticleId);
router.delete("/:id", ArticleController.deleteArticle);
router.put("/:id", upload, ArticleController.updateArticle);
router.get("/bycategory/:id_category", ArticleController.getArticleByCategorie);

router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send("Something went wrong!");
    }
    res.send(req.file);
  });
});
module.exports = router;
