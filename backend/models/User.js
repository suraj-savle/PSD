import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  // LOGIN / ACCOUNT INFO
  username: { 
    type: String, 
    required: [true, "Username is required"], 
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [30, "Username cannot exceed 30 characters"],
    match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"]
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: "Please provide a valid email address"
    }
  },
  password: { 
    type: String, 
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"]
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true },

  // PERSONAL DETAILS
  firstName: { 
    type: String, 
    required: [true, "First name is required"],
    trim: true,
    maxlength: [50, "First name cannot exceed 50 characters"]
  },
  middleName: { 
    type: String, 
    trim: true,
    maxlength: [50, "Middle name cannot exceed 50 characters"]
  },
  lastName: { 
    type: String, 
    required: [true, "Last name is required"],
    trim: true,
    maxlength: [50, "Last name cannot exceed 50 characters"]
  },
  fullName: { type: String }, // auto set before save
  gender: { 
    type: String, 
    enum: ["Male", "Female", "Other"], 
    required: [true, "Gender is required"] 
  },
  dob: { 
    type: Date, 
    required: [true, "Date of birth is required"],
    validate: {
      validator: function(dob) {
        return dob <= new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000);
      },
      message: "Invalid date of birth"
    }
  },
  aadhar: { 
    type: String, 
    required: [true, "Aadhar number is required"], 
    unique: true,
    validate: {
      validator: function(aadhar) {
        return /^\d{12}$/.test(aadhar);
      },
      message: "Aadhar number must be 12 digits"
    }
  },

  // PARENTS DETAILS
  fatherName: { type: String, required: true, trim: true, maxlength: 100 },
  fatherAadhar: { 
    type: String,
    validate: {
      validator: v => !v || /^\d{12}$/.test(v),
      message: "Father's Aadhar must be 12 digits"
    }
  },
  fatherDivorce: { type: Boolean, default: false },

  motherName: { type: String, required: true, trim: true, maxlength: 100 },
  motherAadhar: { 
    type: String,
    validate: {
      validator: v => !v || /^\d{12}$/.test(v),
      message: "Mother's Aadhar must be 12 digits"
    }
  },
  motherWidowDivorce: { type: Boolean, default: false },

  mobile: { 
    type: String, 
    required: true,
    validate: {
      validator: function(mobile) {
        return /^[6-9]\d{9}$/.test(mobile);
      },
      message: "Please provide a valid Indian mobile number"
    }
  },
  parentAddress: { type: String, required: true, maxlength: 500 },

  // BANK DETAILS
  bankName: { type: String, required: true, maxlength: 100 },
  branchName: { type: String, required: true, maxlength: 100 },
  accountHolder: { type: String, required: true, maxlength: 100 },
  accountNumber: { 
    type: String, 
    required: true,
    validate: {
      validator: acc => /^\d{9,18}$/.test(acc),
      message: "Account number must be 9-18 digits"
    }
  },
  confirmAccountNumber: { 
    type: String, 
    required: true,
    validate: {
      validator: function(confirmAccountNumber) {
        return confirmAccountNumber === this.accountNumber;
      },
      message: "Account numbers do not match"
    }
  },
  ifsc: { 
    type: String, 
    required: true,
    validate: {
      validator: ifsc => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc),
      message: "Please provide a valid IFSC code"
    }
  },
  aadhaarLinked: { type: Boolean, default: false }

}, {
  timestamps: true
});

// Hash password before save
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Set fullName before save
userSchema.pre("save", function(next) {
  this.fullName = `${this.firstName} ${this.middleName ? this.middleName + ' ' : ''}${this.lastName}`;
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Hide sensitive fields
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.confirmAccountNumber;
  return obj;
};

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ aadhar: 1 });

export default mongoose.model("User", userSchema);
