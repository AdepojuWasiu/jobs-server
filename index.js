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
  res.send(`✅ Job Website API is Running!
              >>>>>
    To test the server you can use POSTMAN
              >>>>>
    To register user send post request url: https://jobs-red-ten.vercel.app/api/auth/register  body: {
                     "name": "Your name",
                    "email": "youremail@gmail.com",
                      "password": "your passwoed"
                    }
              >>>>>>
    To login user send post request url: https://jobs-red-ten.vercel.app/api/auth/login body: {
                     "email": "youremail@gmail.com",
                       "password": "your passwoed"
                     }
             >>>>>>>
    To register jobs send post request url: https://jobs-red-ten.vercel.app/api/jobs body: {

            "title": "job title",
            "company": "Company name",
            "location": "Location of job",
            "requirements": "requiremwnts for the job"
        }
            >>>>>>
    To fetch all jobs send get request url: https://jobs-red-ten.vercel.app/api/jobs body:none`);
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
