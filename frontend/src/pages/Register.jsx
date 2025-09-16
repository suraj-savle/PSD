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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // TODO: connect to backend API
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Scholarship Registration Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ================= User Details ================= */}
          <section>
            <h3 className="text-lg font-semibold mb-4">User Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
            </div>
          </section>

          {/* ================= Personal Details ================= */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name (पहिले नाव)"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name (मधले नाव)"
                value={formData.middleName}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name (आडनाव)"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                name="fullName"
                placeholder="Beneficiary Full Name (लाभार्थी पूर्ण नाव)"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              >
                <option value="">--Select Gender--</option>
                <option value="male">Male (पुरुष)</option>
                <option value="female">Female (स्त्री)</option>
                <option value="other">Other (इतर)</option>
              </select>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="aadhar"
                placeholder="Aadhar Card (आधार कार्ड)"
                value={formData.aadhar}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
            </div>
          </section>

          {/* ================= Parent Details ================= */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Parents Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fatherName"
                placeholder="Father/Guardian Full Name (वडील/गॉर्डीअन पूर्ण नाव)"
                value={formData.fatherName}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="fatherAadhar"
                placeholder="Father Aadhar Card (वडिलांचे आधार कार्ड)"
                value={formData.fatherAadhar}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="fatherDivorce"
                  checked={formData.fatherDivorce}
                  onChange={handleChange}
                />
                Divorce (घटस्फोट)
              </label>

              <input
                type="text"
                name="motherName"
                placeholder="Mother Full Name (आईचे पूर्ण नाव)"
                value={formData.motherName}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="motherAadhar"
                placeholder="Mother Aadhar Card (आईचे आधार कार्ड)"
                value={formData.motherAadhar}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="motherWidowDivorce"
                  checked={formData.motherWidowDivorce}
                  onChange={handleChange}
                />
                Widow/Divorce (विधवा/घटस्फोट)
              </label>

              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number (मोबाईल क्रमांक)"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />

              <textarea
                name="parentsAddress"
                placeholder="Parents Address (पालकांचा पत्ता)"
                value={formData.parentsAddress}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2 md:col-span-2"
              />
            </div>
          </section>

          {/* ================= Bank Details ================= */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              >
                <option value="">--Select Bank--</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
              </select>
              <input
                type="text"
                name="branch"
                placeholder="Branch Name (शाखेचे नाव)"
                value={formData.branch}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="accountHolder"
                placeholder="Account Holder Name (खातेधारकाचे नाव)"
                value={formData.accountHolder}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="accountNumber"
                placeholder="Account No (खाते क्रमांक)"
                value={formData.accountNumber}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="confirmAccountNumber"
                placeholder="Confirm Account No (खाते क्रमांक पुष्टी)"
                value={formData.confirmAccountNumber}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="ifsc"
                placeholder="IFSC Code (IFSC कोड)"
                value={formData.ifsc}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
            </div>
          </section>

          {/* ================= Submit ================= */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
