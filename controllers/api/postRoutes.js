const router = require("express").Router();
const withAuth = require("../../utils/auth");
// Pull in model info from parent index file in models to descure depencencies' definitions
const { Post, Comment } = require("../../models");

router.post("/", withAuth, async (req, res) => {
  try {
    // Get the info needed for the new post - use the user_id that is currently signed in through session
    const postBody = {
      title: req.body.name,
      content: req.body.content,
      date_created: Date.now(),
      user_id: req.session.userID,
    };

    // Create the new post using the body
    const newPost = await Post.create(postBody);

    // Confirm if successfull
    res.status(200).json(newPost);
  } catch (err) {
    // Log and send the error if not
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
