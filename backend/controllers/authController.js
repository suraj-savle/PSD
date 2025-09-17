import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER with full schema
export const registerUser = async (req, res) => {
  try {
    const {
      username, email, password,
      firstName, middleName, lastName,
      gender, dob, aadhar,
      fatherName, fatherAadhar, fatherDivorce,
      motherName, motherAadhar, motherWidowDivorce,
      mobile, parentAddress,
      bankName, branchName, accountHolder,
      accountNumber, confirmAccountNumber, ifsc, aadhaarLinked
    } = req.body;

    // check existing
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // full name auto
    const fullName = `${firstName} ${middleName ? middleName + " " : ""}${lastName}`;

    // create user
    const newUser = new User({
      username, email, password: hashedPassword,
      firstName, middleName, lastName, fullName,
      gender, dob, aadhar,
      fatherName, fatherAadhar, fatherDivorce,
      motherName, motherAadhar, motherWidowDivorce,
      mobile, parentAddress,
      bankName, branchName, accountHolder,
      accountNumber, confirmAccountNumber, ifsc, aadhaarLinked
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body; 
    // identifier = email OR username

    // find user by email OR username
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

