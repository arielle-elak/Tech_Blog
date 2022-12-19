// Middleware to prevent unauthorized access to login-required pages
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  } else {
    // Forward the request to the next middleware
    next();
  }
};

module.exports = withAuth;
