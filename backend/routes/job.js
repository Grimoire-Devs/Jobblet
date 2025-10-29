const express = require("express");
const router = express.Router();
const { createJob, searchJobs, getJobDetails } = require("../controllers/job");
const { verifyUser } = require("../middlewares/auth");

router.post("/create", verifyUser, createJob);
router.get("/search", searchJobs);
router.get("/:id", getJobDetails);

module.exports = router;
