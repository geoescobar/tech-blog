const router = require("express").Router();
const { User } = require("../../models");
const { uuid } = require("uuidv4");

// ================================ log-in ================================

router.post("/login", async (req, res) => {
  console.log("hello world");
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    console.log("userdata", userData);
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
    console.log("error", err);
    res.status(400).json(err);
  }
});

// ================================ sign-up ================================
router.post("/signup", async (req, res) => {
  try {
    const dbNewUser = await User.create({ ...req.body, id: uuid() });

    // req.session.save(() => {
    //   req.session.logged_in = true;
    //   req.session.user_id = dbNewUser.id;
    res.status(201).json(dbNewUser);
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// ================================ logout ================================

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
