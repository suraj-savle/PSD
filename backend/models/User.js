import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  fullName: { type: String },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  aadhar: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  
  // Optional fields
  fatherName: { type: String },
  fatherOccupation: { type: String },
  fatherIncome: { type: String },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherIncome: { type: String },
  guardianRelation: { type: String },
  parentsAddress: { type: String },
  course: { type: String },
  institution: { type: String },
  yearOfStudy: { type: String },
  previousMarks: { type: String },
  category: { type: String },
  annualIncome: { type: String },
  bank: { type: String },
  branch: { type: String },
  accountHolder: { type: String },
  accountNumber: { type: String },
  confirmAccountNumber: { type: String },
  ifsc: { type: String },
  aadhaarLinked: { type: Boolean, default: false }
}, {
  timestamps: true
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
