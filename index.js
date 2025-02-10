const express = require("express");
const cors = require("cors");
const supabase = require('./config/db')
const jobRoutes = require("./routes/jobs");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("✅ Job Website API is Running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
