const router = require("express").Router();
const articleCommentController = require("../controllers/CommentController");

router.get("/:article_id/comments", articleCommentController.list);
router.post("/:article_id/comments/create", articleCommentController.create);
router.put("/comments/:comment_id/update", articleCommentController.update);
router.delete("/comments/:comment_id/delete", articleCommentController.delete);
module.exports = router;
