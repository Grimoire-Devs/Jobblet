const express = require("express");
const router = express.Router();
const { createJob, searchJobs } = require("../controllers/job");
const { verifyUser } = require("../middlewares/auth");

router.post("/create", verifyUser, createJob);
router.get("/search", searchJobs);

module.exports = router;
