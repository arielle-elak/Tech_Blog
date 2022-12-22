// User API Routes

const router = require("express").Router();
const { User } = require("../../models");

// Create a New User
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User Sign In - Find User data by email, request Comparison of email and password validity
router.post("/login", async (req, res) => {
  try {

    // Find any users that have the supplied email
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // If there are no users of that email, throw an error
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email. Please try again!" });
      return;
    }

    // Assuming the email was valid, check the password
    const validPassword = await dbUserData.checkPassword(req.body.password);

    // Reject bad passwords
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    // Start a session for the user
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userID = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.userEmail = req.body.email;

      // Send confirmatory info
      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    // Log and send the error
    console.log(err);
    res.status(500).json(err);
  }
});

// User Sign Out - if user is currently in logged_in state, delete the session entry

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // res.render('loggedout');
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
