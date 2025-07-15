const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/signup", async (req, res) => {
  const data = req.body;
  const coordinates = [
    data.location.coordinates.lat,
    data.location.coordinates.lng,
  ];
  const address = {
    address: data.location.address,
    pincode: data.location.pincode,
    location: {
      coordinates: coordinates,
    },
  };
  const user = await User.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    role: data.role,
    password: data.password,
    address: address,
  });
  return res.json({ user });
});

router.post("/login", async (req, res) => {
  const { email, phone, password } = req.body;
  if (!email && !phone)
    return res.status(400).json({ messages: "Email or Phone is required" });
  if (!password)
    return res.status(400).json({ messages: "Password is required" });
  try {
    const payload = await User.validateUserLogin(email, phone, password);
    return res.status(200).json({ payload });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
