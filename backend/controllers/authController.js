import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Test endpoint
export const testEndpoint = async (req, res) => {
  res.json({ message: "Server is working" });
};

// REGISTER with full schema
export const registerUser = async (req, res) => {
  try {
    console.log('Registration request body:', req.body);
    
    const {
      username, email, password,
      firstName, middleName, lastName,
      gender, dob, aadhar, mobile,
      ...otherData
    } = req.body;

    // Basic validation
    if (!username || !email || !password || !firstName || !lastName || !gender || !dob || !aadhar || !mobile) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Additional validation
    if (username.length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters long" });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }
    
    if (!/^\d{12}$/.test(aadhar)) {
      return res.status(400).json({ message: "Aadhar number must be exactly 12 digits" });
    }
    
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ message: "Mobile number must be a valid 10-digit number starting with 6-9" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { aadhar }]
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists with this email, username, or Aadhar number' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Convert dob string to Date object
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
      return res.status(400).json({ message: "Invalid date of birth format" });
    }

    // Create user with all fields
    const newUser = new User({
      username, 
      email, 
      password: hashedPassword,
      firstName, 
      middleName: middleName || '', 
      lastName,
      gender, 
      dob: dobDate, 
      aadhar,
      mobile,
      ...otherData
    });

    await newUser.save();

    // Create JWT for auto-login
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({ 
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName
      }
    });
  } catch (err) {
    console.error('Registration error details:', {
      message: err.message,
      stack: err.stack,
      name: err.name,
      errors: err.errors
    });
    
    // Handle MongoDB duplicate key errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ 
        message: `${field} already exists. Please use a different ${field}.`
      });
    }
    
    res.status(500).json({ 
      message: 'Registration failed', 
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body; 
    // identifier = email OR username OR mobile

    // Validation restrictions
    if (!identifier || identifier.trim().length === 0) {
      return res.status(400).json({ message: "Please provide username, email, or mobile number" });
    }
    if (!password || password.length === 0) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (identifier.length < 3) {
      return res.status(400).json({ message: "Invalid identifier format" });
    }

    // find user by email OR username OR mobile
    const user = await User.findOne({
      $or: [{ email: identifier },{ mobile: identifier } ,{ username: identifier }]
    });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

