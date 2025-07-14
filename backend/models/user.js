const mongoose = require("mongoose");
const { createHash, randomBytes } = require("crypto");

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
    default: "Point",
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10}$/, "Phone must be 10 digits"],
    },
    role: {
      type: String,
      enum: ["worker", "client", "admin"],
      default: "worker",
    },
    address: {
      address: { type: String },
      pincode: { type: String },
      location: pointSchema,
    },
    profileImage: {
      type: String,
    },
    
  },
  { timestamps: true }
);

userSchema.index({ "address.location": "2dsphere" });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = randomBytes(10);
  const hash = createHash("sha256", salt);
  const hashedPassword = hash.update(this.password).digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static("validateUserLogin", async function (email, phone, password) {
  let user;
  if (!email && !phone) {
    throw new Error("Bad Request");
  }
  if (email) await this.findOne({ email: email });
  else await this.findOne({ phone: phone });

  if (!user) {
    throw new Error("User not found!");
  }
  const hash = createHash("sha256", user.salt);
  const hashedPassword = hash.update(password).digest("hex");
  if (hashedPassword !== user.password) {
    throw new Error("Incorrect Password");
  }
  const token = tokenUtils.createToken(user);
  return token;
});
const User = mongoose.model("User", userSchema);
module.exports = User;
