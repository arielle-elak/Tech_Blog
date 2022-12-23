const router = require("express").Router();
// Pull in model info from parent index file in models to descure depencencies' definitions
const { User } = require("../../models/");

// Create new user
router.post("/", async (req, res) => {
  try {
    // Create user from request body
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Log the user in and create a session
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userID = dbUserData.id;
      req.session.username = req.body.username;
      req.session.userEmail = req.body.email;

      // Send confirmatory info
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    // Log and send the error
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
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

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    // Get all users
    const allUsers = await User.findAll();

    // Strip out extra sequelize content
    const plainUsers = allUsers.map((row) => row.get({ plain: true }));

    // Debugging logs
    console.log(plainUsers);

    // Send data and positive response
    res.status(200).json(plainUsers);
  } catch (err) {
    // Log and send any errors
    console.log(err);
    res.status(400).json(err);
  }
});

// Get one user
router.get("/:id", async (req, res) => {
  try {
    // Get all users
    const oneUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    // Strip out extra sequelize content
    const plainUser = oneUser.get({ plain: true });

    // Debugging logs
    console.log(plainUser);

    // Send data and positive response
    res.status(200).json(plainUser);
  } catch (err) {
    // Log and send any errors
    console.log(err);
    res.status(400).json(err);
  }
});

// Update one user
router.put("/:id", async (req, res) => {
  try {
    // Create body before it gets updated for logging purposes
    const newBody = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    console.log("Updating user with information:", newBody);

    // Update the user
    const updatedUser = await User.update(newBody, {
      where: {
        id: req.params.id,
      },
    });

    // Send confirmatory information that the update was successful
    res.status(200).json(updatedUser);
  } catch (err) {
    // Send errors
    console.log(err);
    res.status(400).json(err);
  }
});

// Delete one user
router.delete("/:id", async (req, res) => {
  try {
    // Delete the user
    const delUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Send confirmatory information
    res.stats(200).json(delUser);
  } catch (err) {
    // Send errors
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
