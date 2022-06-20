console.log("test");

// ================================ login ================================
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/homepage");
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

  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (email && password && fname && lname && username) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password, lname, fname, username }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/login");
    } else {
      alert("Failed to create new user");
    }
  }
};

document.getElementById("signupbttn")?.addEventListener("click", signup);


