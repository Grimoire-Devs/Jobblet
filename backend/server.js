const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
