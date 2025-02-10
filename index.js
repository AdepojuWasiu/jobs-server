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
  res.send(`✅ Job Website API is Running!<br><br>
  >>>>> <br>
  To test the server you can use POSTMAN <br>
  >>>>> <br>
  <strong>To register user</strong>, send a POST request:<br>
  <strong>URL:</strong> <code>https://jobs-red-ten.vercel.app/api/auth/register</code> <br>
  <strong>Body:</strong> <br>
  <pre>
  {
    "name": "Your name",
    "email": "youremail@gmail.com",
    "password": "your password"
  }
  </pre>
  >>>>> <br>
  <strong>To login user</strong>, send a POST request:<br>
  <strong>URL:</strong> <code>https://jobs-red-ten.vercel.app/api/auth/login</code> <br>
  <strong>Body:</strong> <br>
  <pre>
  {
    "email": "youremail@gmail.com",
    "password": "your password"
  }
  </pre>
  >>>>> <br>
  <strong>To register jobs</strong>, send a POST request:<br>
  <strong>URL:</strong> <code>https://jobs-red-ten.vercel.app/api/jobs</code> <br>
  <strong>Body:</strong> <br>
  <pre>
  {
    "title": "job title",
    "company": "Company name",
    "location": "Location of job",
    "requirements": "requirements for the job"
  }
  </pre>
  >>>>> <br>
  <strong>To fetch all jobs</strong>, send a GET request:<br>
  <strong>URL:</strong> <code>https://jobs-red-ten.vercel.app/api/jobs</code> <br>
  <strong>Body:</strong> none <br>
  `);
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
