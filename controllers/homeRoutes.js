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

// ===================== feed =====================
router.get("/feed", async (req, res) => {
  try {
    const dbPosts = await Posts.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    const posts = dbPosts.map((post) => post.get({ plain: true }));
    console.log("posts>>>", posts);
    res.render("feed", { posts });
  } catch (error) {
    res.json(error);
  }
});

// ===================== homepage =====================

router.get("/homepage", withAuth, async (req, res) => {
  console.log("test:", req.session.user_id);
  try {
    const user = await User.findByPk(req.session.user_id);

    const userPosts = await Posts.findAll({
      include: {
        model: User,
      },
      where: {
        user_id: req.session.user_id,
      },
    });
    const myPosts = userPosts.map((post) => post.get({ plain: true }));
    console.log("my posts:", myPosts);
    res.render("homepage", { myPosts, username: user.username });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
