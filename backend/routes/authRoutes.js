import User from "../models/User.js";

import express from "express"
import bcrypt from "bcryptjs";
 
const router = express.Router();
// register
router.post("/register",async(req ,res) => {
  try{
    const {name,email,password}=req.body;
    if(!name|| !email|| !password){
        return res.status(400).json({ message: "All fields are required" });
    }
    const salt =await bcrypt.genSalt(10)
    const hasherPassword = await bcrypt.hash(password,salt);
const newUser = new User({
  name,
  email,
  password: hasherPassword
});

    const existingUser = await User.findOne({email});
    if(existingUser){
        return  res.status(400).json({ message: "Email already registered" });
    }
    await newUser.save();
    
    res.status(201).json({
      message: "User registered successfully"
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// login
// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. Success
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;

