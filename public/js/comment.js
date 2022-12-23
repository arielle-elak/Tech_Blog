// Create a new comment
const commentSubmit = async (event) => {
  // Prevent premature page reload
  event.preventDefault();
  console.log("commentSubmit event occured");

  // Get comment information from page elements
  const commentBody = document.querySelector("#comment-body").value.trim();
  const postID = document
    .querySelector("#comment-submit")
    .getAttribute("data-post");
  let success_flag = 0;
  // console.log(postID)

  //send comment to backend
  if (commentBody) {
    const response = await fetch(`/api/comments/create`, {
      method: "POST",
      body: JSON.stringify({ commentBody, postID }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Comment added");
        success_flag = 1;
        location.reload();
    } else {
      alert("Failed to add comment");
    }
  }

};

document
  .querySelector("#comment-submit")
  .addEventListener("click", commentSubmit);
