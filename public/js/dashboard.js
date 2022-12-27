// Handler for when new post is created on dashboard
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
      console.log(title, content);
    }
  }
};

// Handler for deleting a post from the dashboard
const deleteButtonHandler = async (event) => {

  var delConf = confirm("Are you sure you would like to delete this post?");
  if (delConf == true) {
    // Ensure the event is being triggered by the correct button with the data-id
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");

      // Use the API call for deleting a post
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh page with updated list of posts
        document.location.replace("/dashboard");
      } else {
        // If there's an error, say it
        alert("Failed to delete post");
      }
    }
  } else {
    return false;
  }

};

document
  .querySelector(".newPost-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".delButton")
  .addEventListener("click", deleteButtonHandler);
