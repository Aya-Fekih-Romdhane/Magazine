const Article = require("../models/Article");
const Category = require("../models/category.model");
var multer = require("multer");
var fs = require("fs");
var path = require("path");

const getArticles = (req, res, next) => {
  Article.find({}).exec((err, articles) => {
    if (err) {
      console.log(err);
    }
    res.json(articles);
  });
};

const AddArticle = async (req, res, next) => {
  const id_category = req.body.id_category;
  const category = await Category.findById(id_category).then((data) => {
    console.log(data);
    const article = new Article({
      Title: req.body.Title,
      Description: req.body.Description,
      AlaUne: false,
      image: req.file.originalname,
      Category: data,
    }).save((err, article) => {
      if (err) {
        console.log(err);
      }
      res.json(article);
    });
  });
};

const getArticleId = async (req, res, next) => {
  const id = req.params.id;
  await Article.findById(id)

    .populate("Category")
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "article is not found" });
      } else {
        return res.json({ data });
      }
    });
};

const deleteArticle = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Article.findByIdAndDelete(id);
    res.json({ message: "Article deleted " });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Article.findByIdAndUpdate(
      { _id: id },
      { Description: req.body.Description, image: req.file.originalname }
    );
    res.json("update successfully");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getArticleByCategorie = async (req, res, next) => {
  const id_category = req.params.id_category;
  await Article.find({ Category: id_category })
    .populate({
      path: "Category",
      select: "name",
    })
    .exec((err, articles) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      return res.json(articles);
    });
};
module.exports = {
  getArticles,
  AddArticle,
  getArticleId,
  deleteArticle,
  updateArticle,
  getArticleByCategorie,
};
