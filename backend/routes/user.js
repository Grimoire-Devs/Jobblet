const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/:id/profile-complete/", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  return res.status(200).json({ profileComplete: user.profile_complete });
});

module.exports = router;
