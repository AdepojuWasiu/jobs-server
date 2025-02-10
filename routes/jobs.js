const express = require("express");
const supabase = require("../config/db");

const router = express.Router();

// Get All Jobs
router.get("/", async (req, res) => {
   try {
    const  {data, error} = await supabase.from('jobs').select('*')
    if(error){
      return res.status(401).json({message:'failed to fetch jobs', error})
    }
    if(data){
       return res.status(200).json({message:'Jobs Fetched', data})
    }
   } catch (error) {
     throw error
   }
});  

// Create Job
router.post("/", async (req, res) => {
   const { title, company, location, requirements } = req.body;
 
   try {
     const { data, error } = await supabase
       .from("jobs")
       .insert({ title, company, location, requirements }); // Insert as an array
 
     if (error) {
       return res.status(400).json({ message: "❌ Failed to create job", error: error.message });
     }
 
     res.status(201).json({ message: "✅ Job Created!", data });
   } catch (error) {
     res.status(500).json({ message: "❌ Server Error", error: error.message });
   }
 });
 

module.exports = router;
