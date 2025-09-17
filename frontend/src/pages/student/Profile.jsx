import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  Edit,
  X,
  Loader,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Shield,
  Mail,
  Calendar,
  Users,
  IdCard,
} from "lucide-react";

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzlhZDI1OWJlOWUxZDZmYTkxNWQwZCIsImlhdCI6MTc1ODExNDkxNCwiZXhwIjoxNzU4MTE4NTE0fQ.fB79hY_VCOEIqiXtIuBzNKZEEIB5AvbDQ3a_NX-kk6E";

  useEffect(() => {
    const fetchStudent = async () => {
      if (!token) {
        setError("Authentication required. Please login.");
        setIsLoading(false);
        navigate("/login");
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        const res = await fetch("http://localhost:5000/api/student/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
          throw new Error(`Failed to fetch profile: ${res.status}`);
        }

        const data = await res.json();
        setStudent(data);
        setForm({
          mobile: data.mobile || "",
          parentAddress: data.parentAddress || "",
          bankName: data.bankName || "",
          accountNumber: data.accountNumber || "",
          confirmAccountNumber: data.accountNumber || "",
          ifsc: data.ifsc || "",
          branchName: data.branchName || "",
          accountHolder: data.accountHolder || "",
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Unable to load profile. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const validateForm = () => {
    if (form.mobile && !/^[6-9]\d{9}$/.test(form.mobile)) {
      return "Please enter a valid Indian mobile number";
    }
    if (form.accountNumber && !/^\d{9,18}$/.test(form.accountNumber)) {
      return "Account number must be 9-18 digits";
    }
    if (form.accountNumber !== form.confirmAccountNumber) {
      return "Account numbers do not match";
    }
    if (form.ifsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc)) {
      return "Please enter a valid IFSC code";
    }
    return null;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsUpdating(true);
      const res = await fetch(
        "http://localhost:5000/api/student/profile/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mobile: form.mobile,
            parentAddress: form.parentAddress,
            bankName: form.bankName,
            accountNumber: form.accountNumber,
            ifsc: form.ifsc,
            branchName: form.branchName,
            accountHolder: form.accountHolder,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      setStudent({ ...student, ...form });
      setSuccess("Profile updated successfully ✅");
      setTimeout(() => setSuccess(""), 3000);
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Update failed. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setForm({
      mobile: student.mobile || "",
      parentAddress: student.parentAddress || "",
      bankName: student.bankName || "",
      accountNumber: student.accountNumber || "",
      confirmAccountNumber: student.accountNumber || "",
      ifsc: student.ifsc || "",
      branchName: student.branchName || "",
      accountHolder: student.accountHolder || "",
    });
    setIsEditing(false);
    setError("");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const maskAccountNumber = (accountNumber) =>
    accountNumber ? `****${accountNumber.slice(-4)}` : "N/A";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 text-red-500 mb-4">
            <AlertCircle className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Error Loading Profile</h2>
          </div>
          <p className="text-gray-600 mb-4">
            {error || "Student data not available"}
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Student Profile
          </h1>
          <p className="text-gray-600">
            Manage your personal and banking information
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                  {student.fullName?.charAt(0) || "U"}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">
                  {student.fullName || "N/A"}
                </h2>
                <p className="opacity-90 flex items-center justify-center md:justify-start gap-2">
                  <Mail size={16} />
                  {student.email || "N/A"}
                </p>
                <p className="opacity-90 flex items-center justify-center md:justify-start gap-2 mt-1">
                  <IdCard size={16} />
                  {student.username || "N/A"}
                </p>
              </div>

              <div className="flex gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all hover:scale-105"
                  >
                    <Edit size={18} />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all hover:scale-105"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Success/Error Messages */}
          <div className="px-6 pt-6">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <p className="text-green-700">{success}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="p-6">
            <form onSubmit={handleUpdate} className="space-y-8">
              {/* Personal Information Card */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InfoField
                    label="Full Name"
                    value={student.fullName}
                    icon={<User size={16} />}
                  />
                  <InfoField label="Username" value={student.username} />
                  <InfoField
                    label="Email"
                    value={student.email}
                    icon={<Mail size={16} />}
                  />
                  <InfoField
                    label="Date of Birth"
                    value={formatDate(student.dob)}
                    icon={<Calendar size={16} />}
                  />
                  <InfoField label="Gender" value={student.gender} />
                  <InfoField
                    label="Aadhar Number"
                    value={
                      student.aadhar
                        ? `****-****-${student.aadhar.slice(-4)}`
                        : "N/A"
                    }
                    icon={<Shield size={16} />}
                  />
                  <InfoField
                    label="Father's Name"
                    value={student.fatherName}
                    icon={<Users size={16} />}
                  />
                  <InfoField
                    label="Mother's Name"
                    value={student.motherName}
                    icon={<Users size={16} />}
                  />

                  {/* Editable Mobile Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Phone size={16} />
                      Mobile Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                        pattern="[6-9][0-9]{9}"
                        maxLength="10"
                        placeholder="Enter 10-digit mobile number"
                      />
                    ) : (
                      <p className="p-3 bg-white rounded-lg border border-gray-200">
                        {student.mobile || "N/A"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bank Information Card */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Building className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Bank Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      key: "bankName",
                      label: "Bank Name",
                      icon: <Building size={16} />,
                    },
                    { key: "branchName", label: "Branch Name" },
                    { key: "accountHolder", label: "Account Holder Name" },
                    {
                      key: "ifsc",
                      label: "IFSC Code",
                      icon: <CreditCard size={16} />,
                    },
                  ].map(({ key, label, icon }) => (
                    <div key={key} className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        {icon}
                        {label}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name={key}
                          value={form[key]}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      ) : (
                        <p className="p-3 bg-white rounded-lg border border-gray-200">
                          {student[key] || "N/A"}
                        </p>
                      )}
                    </div>
                  ))}

                  {/* Account Number Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <CreditCard size={16} />
                      Account Number
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="accountNumber"
                        value={form.accountNumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                        pattern="[0-9]{9,18}"
                        maxLength="18"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                        <span>{maskAccountNumber(student.accountNumber)}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setShowAccountNumber(!showAccountNumber)
                          }
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {showAccountNumber ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                        {showAccountNumber && (
                          <span className="text-sm text-gray-500 ml-2">
                            {student.accountNumber}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Confirm Account Number (Editing only) */}
                  {isEditing && (
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <CreditCard size={16} />
                        Confirm Account Number
                      </label>
                      <input
                        type="text"
                        name="confirmAccountNumber"
                        value={form.confirmAccountNumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                        pattern="[0-9]{9,18}"
                        maxLength="18"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Address Information
                  </h3>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin size={16} />
                    Parent's Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="parentAddress"
                      value={form.parentAddress}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      rows={3}
                      required
                      placeholder="Enter your complete address"
                    />
                  ) : (
                    <p className="p-3 bg-white rounded-lg border border-gray-200 whitespace-pre-line">
                      {student.parentAddress || "N/A"}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              {isEditing && (
                <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all hover:shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg transition-all hover:shadow-lg"
                  >
                    {isUpdating ? (
                      <Loader className="animate-spin h-5 w-5" />
                    ) : (
                      <Save size={18} />
                    )}
                    {isUpdating ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for display fields
const InfoField = ({ label, value, icon }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      {icon}
      {label}
    </label>
    <p className="p-3 bg-white rounded-lg border border-gray-200">
      {value || "N/A"}
    </p>
  </div>
);
