import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from '../components/DatePicker';

export default function Register() {
  const [formData, setFormData] = useState({
    // User Details
    username: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Personal Details
    firstName: "",
    middleName: "",
    lastName: "",
    fullName: "",
    gender: "",
    dob: "",
    aadhar: "",

    // Parent Details
    fatherName: "",
    fatherOccupation: "",
    fatherIncome: "",
    motherName: "",
    motherOccupation: "",
    motherIncome: "",
    guardianRelation: "",
    mobile: "",
    parentsAddress: "",

    // Academic Details
    course: "",
    institution: "",
    yearOfStudy: "",
    previousMarks: "",
    category: "",
    annualIncome: "",
    
    // Bank Details
    bank: "",
    branch: "",
    accountHolder: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifsc: "",
  });

  const [errors, setErrors] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const sections = [
    "User Details",
    "Personal Details",
    "Parents/Guardian Details",
    "Academic Details",
    "Bank Details"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateSection = () => {
    const newErrors = {};
    
    if (currentSection === 0) {
      if (!formData.username) newErrors.username = "Username is required";
      else if (formData.username.length < 3) newErrors.username = "Username must be at least 3 characters";
      else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) newErrors.username = "Username can only contain letters, numbers, and underscores";
      
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please provide a valid email address";
      
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
      
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (currentSection === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.gender) newErrors.gender = "Please select gender";
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!formData.aadhar) newErrors.aadhar = "Aadhar number is required";
      else if (!/^\d{12}$/.test(formData.aadhar)) newErrors.aadhar = "Aadhar must be 12 digits";
    }
    
    if (currentSection === 2) {
      if (!formData.fatherName) newErrors.fatherName = "Father's name is required";
      if (!formData.fatherOccupation) newErrors.fatherOccupation = "Father's occupation is required";
      if (!formData.fatherIncome) newErrors.fatherIncome = "Father's income is required";
      if (!formData.motherName) newErrors.motherName = "Mother's name is required";
      if (!formData.motherOccupation) newErrors.motherOccupation = "Mother's occupation is required";
      if (!formData.mobile) newErrors.mobile = "Mobile number is required";
      else if (!/^[6-9]\d{9}$/.test(formData.mobile)) newErrors.mobile = "Mobile must be a valid 10-digit number starting with 6-9";
      if (!formData.parentsAddress) newErrors.parentsAddress = "Address is required";
    }
    
    if (currentSection === 3) {
      if (!formData.course) newErrors.course = "Course is required";
      if (!formData.institution) newErrors.institution = "Institution is required";
      if (!formData.yearOfStudy) newErrors.yearOfStudy = "Year of study is required";
      if (!formData.previousMarks) newErrors.previousMarks = "Previous marks are required";
      if (!formData.category) newErrors.category = "Category is required";
      if (!formData.annualIncome) newErrors.annualIncome = "Annual income is required";
    }
    
    if (currentSection === 4) {
      if (!formData.bank) newErrors.bank = "Please select a bank";
      if (!formData.branch) newErrors.branch = "Branch name is required";
      if (!formData.accountHolder) newErrors.accountHolder = "Account holder name is required";
      if (!formData.accountNumber) newErrors.accountNumber = "Account number is required";
      if (formData.accountNumber !== formData.confirmAccountNumber) newErrors.confirmAccountNumber = "Account numbers do not match";
      if (!formData.ifsc) newErrors.ifsc = "IFSC code is required";
      else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc)) newErrors.ifsc = "IFSC format is invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection()) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    } else {
      toast.error('Please fill all required fields correctly');
    }
  };

  const handlePrev = () => {
    setCurrentSection(currentSection - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateSection()) {
      try {
        // Prepare form data with proper date format
        const submitData = {
          ...formData,
          dob: formData.dob ? new Date(formData.dob).toISOString() : ''
        };
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData),
        });
        
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          toast.success('Registration successful! Redirecting to dashboard...');
          setTimeout(() => {
            navigate('/student');
          }, 2000);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        toast.error('Network error. Please check your connection and try again.');
      }
    } else {
      toast.error('Please fill all required fields correctly');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your scholarship application has been received. You will receive a confirmation email shortly.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all">
            PMSSS
          </Link>
          <Link to="/login" className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all transform hover:scale-105 font-medium">
            Login
          </Link>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4">
          <div className="flex justify-between items-center mb-2">
            {sections.map((section, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    index <= currentSection
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm mt-2 ${
                    index === currentSection ? "font-bold text-indigo-600" : "text-gray-600"
                  }`}
                >
                  {section}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-300 h-2 rounded-full">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PMSSS Scholarship Registration
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete all sections to apply for the scholarship
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* ================= User Details ================= */}
            {currentSection === 0 && (
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-indigo-700 mb-6">
                  User Account Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className={`w-full border-2 rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50/50 hover:bg-white ${
                        errors.username ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={`w-full border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-xl">
                  <p className="text-sm text-indigo-700 flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Password Requirements: Minimum 8 characters with at least 1 uppercase letter, 1 lowercase letter, and 1 number. Username must be 3+ characters with only letters, numbers, and underscores.
                  </p>
                </div>
              </section>
            )}

            {/* ================= Personal Details ================= */}
            {currentSection === 1 && (
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-indigo-700 mb-6">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name (पहिले नाव)"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="middleName"
                      placeholder="Middle Name (मधले नाव)"
                      value={formData.middleName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name (आडनाव)"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Beneficiary Full Name (लाभार्थी पूर्ण नाव)"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.gender ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">--Select Gender--</option>
                      <option value="male">Male (पुरुष)</option>
                      <option value="female">Female (स्त्री)</option>
                      <option value="other">Other (इतर)</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <DatePicker
                      value={formData.dob}
                      onChange={handleChange}
                      placeholder="Select your date of birth"
                      error={errors.dob}
                    />
                    {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card Number</label>
                    <input
                      type="text"
                      name="aadhar"
                      placeholder="Enter 12-digit Aadhar number"
                      value={formData.aadhar}
                      onChange={handleChange}
                      required
                      maxLength="12"
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.aadhar ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.aadhar && <p className="text-red-500 text-sm mt-1">{errors.aadhar}</p>}
                  </div>
                </div>
              </section>
            )}

            {/* ================= Parent Details ================= */}
            {currentSection === 2 && (
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">
                  Parents/Guardian Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="fatherName"
                      placeholder="Father's Full Name"
                      value={formData.fatherName}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.fatherName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="fatherOccupation"
                      placeholder="Father's Occupation"
                      value={formData.fatherOccupation}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.fatherOccupation ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.fatherOccupation && <p className="text-red-500 text-sm mt-1">{errors.fatherOccupation}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="motherName"
                      placeholder="Mother's Full Name"
                      value={formData.motherName}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.motherName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.motherName && <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="motherOccupation"
                      placeholder="Mother's Occupation"
                      value={formData.motherOccupation}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.motherOccupation ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.motherOccupation && <p className="text-red-500 text-sm mt-1">{errors.motherOccupation}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="fatherIncome"
                      placeholder="Father's Annual Income (₹)"
                      value={formData.fatherIncome}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.fatherIncome ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.fatherIncome && <p className="text-red-500 text-sm mt-1">{errors.fatherIncome}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="motherIncome"
                      placeholder="Mother's Annual Income (₹)"
                      value={formData.motherIncome}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <select
                      name="guardianRelation"
                      value={formData.guardianRelation}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="">Guardian Relationship (if applicable)</option>
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="uncle">Uncle</option>
                      <option value="aunt">Aunt</option>
                      <option value="grandfather">Grandfather</option>
                      <option value="grandmother">Grandmother</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="mobile"
                      placeholder="Contact Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      maxLength="10"
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.mobile ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                  </div>
                </div>
                
                <div>
                  <textarea
                    name="parentsAddress"
                    placeholder="Complete Home Address"
                    value={formData.parentsAddress}
                    onChange={handleChange}
                    required
                    rows="3"
                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      errors.parentsAddress ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.parentsAddress && <p className="text-red-500 text-sm mt-1">{errors.parentsAddress}</p>}
                </div>
              </section>
            )}

            {/* ================= Academic Details ================= */}
            {currentSection === 3 && (
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">
                  Academic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="course"
                      placeholder="Course/Program Name"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      className={`w-full border-2 rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50/50 hover:bg-white ${
                        errors.course ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                    {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="institution"
                      placeholder="Institution/College Name"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                      className={`w-full border-2 rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50/50 hover:bg-white ${
                        errors.institution ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                    {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <select
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleChange}
                      required
                      className={`w-full border-2 rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50/50 hover:bg-white ${
                        errors.yearOfStudy ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <option value="">Year of Study</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                    {errors.yearOfStudy && <p className="text-red-500 text-sm mt-1">{errors.yearOfStudy}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="previousMarks"
                      placeholder="Previous Year %"
                      value={formData.previousMarks}
                      onChange={handleChange}
                      required
                      className={`w-full border-2 rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50/50 hover:bg-white ${
                        errors.previousMarks ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                    {errors.previousMarks && <p className="text-red-500 text-sm mt-1">{errors.previousMarks}</p>}
                  </div>
                  <div>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className={`w-full border-2 rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50/50 hover:bg-white ${
                        errors.category ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <option value="">Category</option>
                      <option value="general">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    name="annualIncome"
                    placeholder="Family Annual Income (₹)"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    required
                    className={`w-full border-2 rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50/50 hover:bg-white ${
                      errors.annualIncome ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                  {errors.annualIncome && <p className="text-red-500 text-sm mt-1">{errors.annualIncome}</p>}
                </div>
              </section>
            )}

            {/* ================= Bank Details ================= */}
            {currentSection === 4 && (
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">
                  Bank Account Information
                </h3>
                <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl mb-4">
                  <p className="text-sm text-indigo-700">
                    <span className="font-semibold">Important:</span> Scholarship amounts will be disbursed to this account. 
                    Please ensure all details are accurate.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <select
                      name="bank"
                      value={formData.bank}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.bank ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">--Select Bank--</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="other">Other Bank</option>
                    </select>
                    {errors.bank && <p className="text-red-500 text-sm mt-1">{errors.bank}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="branch"
                      placeholder="Branch Name (शाखेचे नाव)"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.branch ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    name="accountHolder"
                    placeholder="Account Holder Name (खातेधारकाचे नाव)"
                    value={formData.accountHolder}
                    onChange={handleChange}
                    required
                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      errors.accountHolder ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.accountHolder && <p className="text-red-500 text-sm mt-1">{errors.accountHolder}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="accountNumber"
                      placeholder="Account No (खाते क्रमांक)"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.accountNumber ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="confirmAccountNumber"
                      placeholder="Confirm Account No (खाते क्रमांक पुष्टी)"
                      value={formData.confirmAccountNumber}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.confirmAccountNumber ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.confirmAccountNumber && <p className="text-red-500 text-sm mt-1">{errors.confirmAccountNumber}</p>}
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    name="ifsc"
                    placeholder="IFSC Code (IFSC कोड)"
                    value={formData.ifsc}
                    onChange={handleChange}
                    required
                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      errors.ifsc ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.ifsc && <p className="text-red-500 text-sm mt-1">{errors.ifsc}</p>}
                </div>
              </section>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10">
              {currentSection > 0 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-10 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg border border-gray-200"
                >
                  ← Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {currentSection < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-xl"
                >
                  ✅ Complete Registration
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e5e7eb',
            padding: '16px 20px',
            fontSize: '16px',
            fontWeight: '500'
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff'
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff'
            }
          }
        }}
      />
    </div>
  );
}