const router = require('express').Router();
const { Post, User } = require('../models');

module.exports = router;

// On Homepage load, retrieve all current posts
router.get("/", async (req, res) => {
  try {
    // Get all projects and include the User data model to display user data with the post
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["title"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
