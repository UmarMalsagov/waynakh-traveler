const { Router } = require("express");
const { commentController } = require("../controllers/comments.controller");
const router = Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/comment", commentController.getComment);
router.post(
  "/comment/:userId/place/:placeId",
  authMiddleware,
  commentController.postComment
);
router.delete("/delete/comment/:commentId", commentController.deleteComment);
router.patch("/patch/comment/:commentId", commentController.patchComment);

module.exports = router;
