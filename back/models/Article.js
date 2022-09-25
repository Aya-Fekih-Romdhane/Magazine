const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    Title: String,
    Description: String,
    image: String,
    AlaUne: Boolean,
    Category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
