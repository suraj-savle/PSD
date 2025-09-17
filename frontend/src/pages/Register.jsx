import { useState } from "react";

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
    fatherAadhar: "",
    fatherDivorce: false,
    motherName: "",
    motherAadhar: "",
    motherWidowDivorce: false,
    mobile: "",
    parentsAddress: "",

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

  const sections = [
    "User Details",
    "Personal Details",
    "Parent Details",
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
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
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
      if (!formData.motherName) newErrors.motherName = "Mother's name is required";
      if (!formData.mobile) newErrors.mobile = "Mobile number is required";
      else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Mobile must be 10 digits";
      if (!formData.parentsAddress) newErrors.parentsAddress = "Address is required";
    }
    
    if (currentSection === 3) {
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
    }
  };

  const handlePrev = () => {
    setCurrentSection(currentSection - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateSection()) {
      console.log("Form Submitted:", formData);
      setSubmitted(true);
      // TODO: connect to backend API
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gray-100 px-8 py-4">
          <div className="flex justify-between items-center mb-2">
            {sections.map((section, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentSection
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-xs mt-1 ${
                    index === currentSection ? "font-bold text-blue-600" : "text-gray-600"
                  }`}
                >
                  {section}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-300 h-2 rounded-full">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
            PMSSS Scholarship Registration
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Complete all sections to apply for the Prime Minister's Special Scholarship Scheme
          </p>

          <form onSubmit={handleSubmit}>
            {/* ================= User Details ================= */}
            {currentSection === 0 && (
              <section className="space-y-6">
                <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">
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
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.username ? "border-red-500" : "border-gray-300"
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
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <input
                      type="password"
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
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700 flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Your password must be at least 6 characters long. Keep it secure as it will be used to access your scholarship portal.
                  </p>
                </div>
              </section>
            )}

            {/* ================= Personal Details ================= */}
            {currentSection === 1 && (
              <section className="space-y-6">
                <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">
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
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.dob ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="aadhar"
                      placeholder="Aadhar Card Number (आधार कार्ड)"
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
              <section className="space-y-6">
                <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">
                  Parents/Guardian Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="fatherName"
                      placeholder="Father/Guardian Full Name (वडील/गॉर्डीअन पूर्ण नाव)"
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
                      name="fatherAadhar"
                      placeholder="Father Aadhar Card (वडिलांचे आधार कार्ड)"
                      value={formData.fatherAadhar}
                      onChange={handleChange}
                      maxLength="12"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="fatherDivorce"
                    id="fatherDivorce"
                    checked={formData.fatherDivorce}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="fatherDivorce" className="ml-2 block text-sm text-gray-700">
                    Divorce (घटस्फोट)
                  </label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="motherName"
                      placeholder="Mother Full Name (आईचे पूर्ण नाव)"
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
                      name="motherAadhar"
                      placeholder="Mother Aadhar Card (आईचे आधार कार्ड)"
                      value={formData.motherAadhar}
                      onChange={handleChange}
                      maxLength="12"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="motherWidowDivorce"
                    id="motherWidowDivorce"
                    checked={formData.motherWidowDivorce}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="motherWidowDivorce" className="ml-2 block text-sm text-gray-700">
                    Widow/Divorce (विधवा/घटस्फोट)
                  </label>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <input
                      type="text"
                      name="mobile"
                      placeholder="Mobile Number (मोबाईल क्रमांक)"
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
                  <div>
                    <textarea
                      name="parentsAddress"
                      placeholder="Parents Address (पालकांचा पत्ता)"
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
                </div>
              </section>
            )}

            {/* ================= Bank Details ================= */}
            {currentSection === 3 && (
              <section className="space-y-6">
                <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">
                  Bank Account Information
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-700">
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
                  className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {currentSection < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
                >
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}