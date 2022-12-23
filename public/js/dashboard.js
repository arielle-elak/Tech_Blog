/**
 * Scripts for Dashboard page behavior
 */

const newFormHandler = async (event) => {
  event.preventDefault();
  // Get post information from page elements
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  // If the user filled in all the required fields...
  if (title && content) {
    // Call the API route to make the post
    const response = await fetch(`/api/posts/create`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Take action based on the server response
    if (response.ok) {
      // Reload the page to show the new post
      document.location.replace("/dashboard");
    } else {
      // Indicate the error
      alert("Failed to create submission");
    }
  }
};
