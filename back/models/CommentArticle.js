const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = new mongoose.Schema(
  {
    comment: String,
    article_id: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const CommentArticle = mongoose.model("CommentArticle", schema);
module.exports = CommentArticle;
