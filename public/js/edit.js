// Handler for when post is edited
const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();
  const postID = document
    .querySelector("#edit-submit")
        .getAttribute("data-post");

    console.log(title + content);

    if (title && content) {
    const response = await fetch(`/api/posts/${postID}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
        },
    });
        console.log(response);


    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to edit post");
      console.log(title, content);
    }
  }
};

document
  .querySelector(".edit-form")
  .addEventListener("submit", editFormHandler);
