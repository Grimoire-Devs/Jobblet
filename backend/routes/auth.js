const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/signup", async (req, res) => {
  const data = req.body;
  //   console.log(data,req.body);
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
  console.log(user);
  return res.json({ user });
});

module.exports = router;
