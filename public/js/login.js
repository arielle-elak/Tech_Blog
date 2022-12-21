// Handler for logging in
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/dashboard");
    } else {
      // Indicate the error
      alert(response.statusText);
    }
  }
};

// Event handler for signing up new users
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Get user information from page elements
  const username = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  // If all fields were completed...
  if (username && email && password) {
    // Call API route to create the new user
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Take the user to their dashboard
      document.location.replace("/dashboard");
    } else {
      // Indicate the error
      alert(response.statusText);
    }
  }
};

// Add event handlers
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
