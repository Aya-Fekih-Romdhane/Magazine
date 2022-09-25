const cors = require('cors');
const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
var path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/getimage',express.static('./uploads/profile_img'))

require("dotenv/config");
const port = 3000;
const AuthRoute = require("./routes/auth");
const ArticleRoute = require("./routes/article.route");
const ArticleCommentRoute = require("./routes/CommentArticleRoute");
const CategorieRoute = require("./routes/categorie.route");
const middleware = require("./helpers/middleware");
const ProfileRoute = require ("./routes/profile.route");
app.use(bodyParser.json());
app.use(cors());

//connection DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connected to db ");
});
// // parse application/json
app.use(bodyParser.json());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

//Routes
app.use("/api", AuthRoute);
app.use("/article", ArticleRoute);
app.use("/categorie", CategorieRoute);
app.use("/comment", middleware.auth, ArticleCommentRoute);
app.use("/profile",middleware.auth,ProfileRoute );

//
app.listen(port, () => {
  console.log(`Server app listening on port http://localhost:${port}`);
});
