const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await supabase.from('users').insert({
               name: name,
               email: email,
               password: hashedPassword
    })

    res.status(201).json({ message: "✅ User Registered Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Registration Failed!", error });
  }
});


// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query user from Supabase
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (error) throw error;

    if (!users || users.length === 0) {
      return res.status(401).json({ message: "❌ Email does not exist" });
    }

    const user = users[0]; // Get the first user

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "❌ Invalid Credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "✅ Login Successful!", token });
  } catch (error) {
    res.status(500).json({ message: "❌ Login Unsecessfull", error: error.message });
  }
});

module.exports = router;
