const router = require("express").Router();
const { User } = require("../../models");



router.post("/login", async (req, res) => {
  console.log("hello world");
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// ================================ sign-up ================================
router.post("/signup", async (req, res) => {
  try {
    const dbNewUser = await User.create(req.body);

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = dbNewUser.id;
      res.status(201).json(dbNewUser);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
