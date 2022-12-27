const router = require("express").Router();
const { User, Post, Comment } = require("../models/index");
const withAuth = require("../utils/auth");
// const sequelize = require('sequelize')

// Homepage
router.get("/", async (req, res) => {
  // Get all posts from all users, including associated users
  const allPosts = await Post.findAll({
    include: [{ model: User }],
    order: [["id", "DESC"]],
  });

  // Strip out the extra sequelize content
  const posts = allPosts.map((row) => row.get({ plain: true }));

  // Render the page with data needed for the handlebars template
  res.render("homepage", {
    session: req.session,
    posts
  });
});

// Dashboard for posting new content + seeing stats
router.get("/dashboard", withAuth, async (req, res) => {
  // Get all posts from the logged in user
  const userPosts = await Post.findAll({
    where: {
      user_id: req.session.userID,
    },
    include: [{ model: User }],
  });

  // Strip out extra sequelize content
  const posts = userPosts.map((row) => row.get({ plain: true }));

  // Diagnostic logs of what's actually going to be rendered
  console.log("posts: ", posts);
  console.log("session: ", req.session);

  // Render the page with data needed for the handlebars template
  res.render("dashboard", {
    session: req.session,
    posts,
  });
});

// Login/signup page
router.get("/login", async (req, res) => {
  // Diagnostic logs of what's actually going to be rendered
  console.log("session: ", req.session);

  // Render the page with data needed for the handlebars template
  res.render("login", {
    session: req.session,
  });
});

// Logged out GET request - just needs to satisfy the call
router.get("/logout", async (req, res) => {

   // Once the session has been destroyed, forward the page back to the home screen
  if (res.ok) {
    console.log(res.statusText);
    // Render the page with data needed for the handlebars template
  } else {
    console.log(res.statusText);
  }
});



// Single post page
router.get("/post/:id", async (req, res) => {
  // Get specified post based on the req params
  const singlePost = await Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: User }, { model: Comment }],
  });

  // If no such post exists, go back to the main page
  if (singlePost == null) {
    res.redirect("/");
    return;
  }

  // Strip out extra sequelize content
  const post = singlePost.get({ plain: true });

  // Diagnostic logs of what's actually going to be rendered
  console.log("post: ", post);
  console.log("session: ", req.session);

  // Render the page with data needed for the handlebars template
  res.render("post", {
    session: req.session,
    post,
  });
});




module.exports = router;
