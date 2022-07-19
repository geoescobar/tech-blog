const router = require("express").Router();
const { Posts } = require("../../models");
const withAuth = require("../../utils/auth");

// ================================ post ================================
router.post("/", withAuth, async (req, res) => {
  console.log("post test");
  try {
    const newPost = await Posts.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// ================================ delete ================================
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Posts.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    // might not need
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ================================ update ================================
router.put("/:id", async (req, res) => {
  console.log("test", req.body);
  try {
    const updatePost = await Posts.update(req.body, {
      where: { user_id: req.session.user_id, id: req.params.id },
    });
    res.status(200).json(updatePost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
