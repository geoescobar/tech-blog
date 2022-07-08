const router = require("express").Router();
const { Posts, User } = require("../models");
const withAuth = require("../utils/auth");

// ===================== landing page =====================
router.get("/", async (req, res) => {
  try {
    res.render("landing");
  } catch (error) {
    res.json(error);
  }
});

// ===================== login page =====================
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/feed");
    return;
  }

  res.render("login");
});

// ===================== sign-up page =====================
router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    res.json(error);
  }
});

// ===================== homepage =====================
router.get("/homepage", async (req, res) => {
  try {
    res.render("homepage");
  } catch (error) {
    res.json(error);
  }
});

// ===================== feed =====================
router.get("/feed", async (req, res) => {
  try {
    res.render("feed");
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
