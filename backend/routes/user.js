const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middlewares/auth");
const { handleUpdateWorkerProfile } = require("../controllers/user.js");
const multer = require("multer");
const upload = multer();
const User = require("../models/user");

router.get("/:id/profile-complete/", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  return res.status(200).json({ profileComplete: user.profile_complete });
});

router.post(
  "/worker/updateProfile",
  verifyUser,
  upload.single("profileImage"),
  handleUpdateWorkerProfile
);

// router.post("/client/updateProfile", handleCompleteProfile);

module.exports = router;
