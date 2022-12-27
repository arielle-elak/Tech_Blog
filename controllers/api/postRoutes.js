const router = require("express").Router();
const withAuth = require("../../utils/auth");
// Pull in model info from parent index file in models to descure depencencies' definitions
const { Post, Comment } = require("../../models");

// Create a New Post
router.post("/", withAuth, async (req, res) => {
  try {
    // Get the info needed for the new post - use the user_id that is currently signed in through session
    const postBody = {
      title: req.body.title,
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

// Get all Posts (e.g. for front page)
router.get("/", async (req, res) => {
    try {
        // Find all posts
        const allPosts = await Post.findAll();

        // Confirm if successfull
        res.status(200).json(allPosts);
    } catch (err) {
        // Log and send the error if not
        console.log(err);
        res.status(400).json(err);
    }
});

// Get One Post (when a user clicks on a post from home page or dashboard)
router.get("/:id", async (req, res) => {
  try {
    // Find One Post
    const singlePost = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    // Confirm if successfull
    res.status(200).json(singlePost);
  } catch (err) {
    // Log and send the error if not
    console.log(err);
    res.status(400).json(err);
  }
});



// Delete A Post
router.delete("/:id", async (req, res) => {
  try {
    // To avoid floating comments, must delete all associated comments to that post_id
    const deletedComments = await Comment.destroy({
      where: {
        post_id: parseInt(req.params.id),
      },
    })

    // Then, delete the post_id
    const deletedPost = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Confirm if successfull (comments first, then post)
    res.status(200).json(deletedPost);
  } catch (err) {
    // Log and send the error if not
    console.log(err);
    res.status(400).json(err);
  }
});


module.exports = router;
