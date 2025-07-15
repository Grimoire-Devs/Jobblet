const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;
const connectDB = require("./utils/connection");
connectDB();

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
