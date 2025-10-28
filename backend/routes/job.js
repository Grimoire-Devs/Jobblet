const express = require("express");
const router = express.Router();
const { createJob } = require('../controllers/job');
const { verifyUser } = require('../middlewares/auth');

router.post('/create', verifyUser, createJob);

module.exports = router;