// ================================ login ================================
const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/feed");
    } else {
      alert("Failed to log in");
    }
  }
};

document
  .getElementById("signinbttn")
  ?.addEventListener("click", loginFormHandler);

// ================================ sign-up ================================
const signup = async (event) => {
  event.preventDefault();
  console.log("object");
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/login");
    } else {
      alert("Failed to create new user");
    }
  }
};

document.getElementById("signup-bttn")?.addEventListener("click", signup);

// ================================ log out ================================
const logout = async (event) => {
  event.preventDefault();

  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Logged Out");
  }
};

const logoutBtn = document.getElementById("logout");
logoutBtn?.addEventListener("click", logout);

// ================================ post ================================

const newPost = async (event) => {
  event.preventDefault();

  const postTitle = document.getElementById("post-title").value.trim();
  const postBody = document.getElementById("post-content").value.trim();

  if ((postTitle, postBody)) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ postTitle, postBody }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to create post");
    }
  }
};

document.getElementById("post-btn")?.addEventListener("click", newPost);

// ================================ mypost edit ================================
const deleteBtn = document.getElementById("delete-btn");
const editBtn = document.getElementById("edit-btn");
const saveBtn = document.getElementById("save-btn");

saveBtn.style.display = "none";
editBtn.style.display = "block";
deleteBtn.style.display = "block";

editBtn.addEventListener("click", () => {
  saveBtn.style.display = "block";
  deleteBtn.style.display = "none";
  editBtn.style.display = "none";
});

saveBtn.addEventListener("click", () => {
  saveBtn.style.display = "none";
  deleteBtn.style.display = "block";
  editBtn.style.display = "block";
});

const edit = (e) => {
  // console.log("foo", e);
  const postId = e.target.getAttribute("data-postId");
  const inputField = document.getElementById(`input-${postId}`);
  const postContent = document.getElementById(`post-${postId}`);

  inputField.hidden = false;
};

// ================================ delete post ================================
const deletePost = async (e) => {
  if (e.target.hasAttribute("data-postId")) {
    const postId = e.target.getAttribute("data-postId");

    const response = await fetch(`/api/homepage/${postId}`, {
      method: "DELETE",
    });

    console.log(response);

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to delete post");
    }
  }
};

