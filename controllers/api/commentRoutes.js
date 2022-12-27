const router = require("express").Router();
const { Comment } = require("../../models/index");

// Make a New Comment
router.post("/create", async (req, res) => {
  try {
    // Define comment body for logging purposes
    const commentBody = {
      author: req.session.username,
      content: req.body.commentBody,
      date_created: Date.now(),
      author_id: req.session.userID,
      post_id: req.body.postID,
    };

    // Create the new comment using the above specified body content
    const newComment = await Comment.create(commentBody);

    // Confirm if successfull

    res.status(200).json(newComment);
  } catch (err) {
    // Log and send the error if not
    console.log(err);
    res.status(400).json(err);
  }
});

// TODO: Delete a Comment
router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Confirm if successfull (comments first, then post)
    res.status(200).json(deletedComment);
  } catch (err) {
    // Log and send the error if not
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
