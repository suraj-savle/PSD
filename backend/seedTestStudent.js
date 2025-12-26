import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedTestStudent = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if test student already exists
    const existingStudent = await User.findOne({ email: 'student@test.com' });
    if (existingStudent) {
      console.log('Test student already exists');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash('Student@123', 12);

    // Create test student
    const testStudent = new User({
      username: 'teststudent',
      email: 'student@test.com',
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'Student',
      fullName: 'Test Student',
      gender: 'male',
      dob: new Date('2000-01-01'),
      aadhar: '123456789012',
      fatherName: 'Test Father',
      fatherOccupation: 'Engineer',
      fatherIncome: '500000',
      motherName: 'Test Mother',
      motherOccupation: 'Teacher',
      mobile: '9876543210',
      parentsAddress: 'Test Address, Test City',
      course: 'Computer Science',
      institution: 'Test University',
      yearOfStudy: '2',
      previousMarks: '85',
      category: 'general',
      annualIncome: '500000',
      bank: 'sbi',
      branch: 'Test Branch',
      accountHolder: 'Test Student',
      accountNumber: '1234567890',
      confirmAccountNumber: '1234567890',
      ifsc: 'SBIN0001234'
    });

    await testStudent.save();
    console.log('✅ Test student created successfully!');
    console.log('📧 Email: student@test.com');
    console.log('🔑 Password: Student@123');

  } catch (error) {
    console.error('Error creating test student:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedTestStudent();