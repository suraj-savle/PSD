import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  User,
  Calendar,
  Building,
  CreditCard,
  Phone,
  AlertCircle,
  CheckCircle,
  Loader,
  X,
  FileCheck,
  Shield,
  BookOpen,
  IndianRupee,
  Send
} from "lucide-react";

export default function ApplySchemeForm() {
  const [student, setStudent] = useState(null);
  const [reason, setReason] = useState("");
  const [documents, setDocuments] = useState({
    aadhaar: null,
    income: null,
    bonafide: null,
    bankPassbook: null,
    marksheet: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadProgress, setUploadProgress] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzlhZDI1OWJlOWUxZDZmYTkxNWQwZCIsImlhdCI6MTc1ODEyMzYyNSwiZXhwIjoxNzU4MTI3MjI1fQ.3eYWrbaNdyLSHKWCk4a3n4VnFLSK_YDnYv3rj71Rvjg";

  useEffect(() => {
    const fetchStudent = async () => {
      if (!token) {
        setError("Authentication required. Please login again.");
        setIsLoading(false);
        navigate("/login");
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:5000/api/student/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
          throw new Error(`Failed to fetch student details: ${res.status}`);
        }

        const data = await res.json();
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student details:", error);
        setError("Failed to load student information. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [token, navigate]);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload only JPEG, PNG, or PDF files");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [field]: 0 }));
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = (prev[field] || 0) + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return { ...prev, [field]: 100 };
        }
        return { ...prev, [field]: newProgress };
      });
    }, 100);

    setDocuments({ ...documents, [field]: file });
    setError("");
  };

  const removeFile = (field) => {
    setDocuments({ ...documents, [field]: null });
    setUploadProgress(prev => ({ ...prev, [field]: 0 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!reason.trim()) {
      setError("Please provide a reason for applying");
      return;
    }

    // Check if all required documents are uploaded
    const requiredDocs = ["aadhaar", "income", "bonafide", "bankPassbook", "marksheet"];
    const missingDocs = requiredDocs.filter(doc => !documents[doc]);
    
    if (missingDocs.length > 0) {
      setError(`Please upload all required documents: ${missingDocs.join(", ")}`);
      return;
    }

    setIsSubmitting(true);
    setError("");
    
    try {
      const formData = new FormData();
      formData.append("reason", reason);
      
      Object.keys(documents).forEach((key) => {
        if (documents[key]) formData.append(key, documents[key]);
      });

      const res = await fetch("http://localhost:5000/api/student/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit application");
      }

      setSuccess("Application Submitted Successfully ✅");
      // Reset form
      setReason("");
      setDocuments({
        aadhaar: null,
        income: null,
        bonafide: null,
        bankPassbook: null,
        marksheet: null,
      });
      
      // Clear file inputs
      document.querySelectorAll('input[type="file"]').forEach(input => {
        input.value = "";
      });
      
      // Redirect after success
      setTimeout(() => {
        navigate("/student/status");
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setError(error.message || "Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const documentIcons = {
    aadhaar: <Shield className="h-5 w-5" />,
    income: <IndianRupee className="h-5 w-5" />,
    bonafide: <FileText className="h-5 w-5" />,
    bankPassbook: <CreditCard className="h-5 w-5" />,
    marksheet: <BookOpen className="h-5 w-5" />
  };

  const documentLabels = {
    aadhaar: "Aadhaar Card",
    income: "Income Certificate",
    bonafide: "College Bonafide",
    bankPassbook: "Bank Passbook",
    marksheet: "Previous Year Marksheet"
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Loading your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Apply for Scholarship Scheme</h1>
          <p className="text-gray-600">Complete your application by providing the required information and documents</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Success/Error Messages */}
          {error && (
            <div className="bg-red-50 border-b border-red-200 p-4 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border-b border-green-200 p-4 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <div className="p-6">
            {!student ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Failed to load student details. Please try again.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Student Info Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Student Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoField label="Full Name" value={student.fullName} icon={<User size={16} />} />
                    <InfoField label="Date of Birth" value={formatDate(student.dob)} icon={<Calendar size={16} />} />
                    <InfoField label="Bank Name" value={student.bankName} icon={<Building size={16} />} />
                    <InfoField 
                      label="Account Number" 
                      value={student.accountNumber ? `****${student.accountNumber.slice(-4)}` : "N/A"} 
                      icon={<CreditCard size={16} />} 
                    />
                    <InfoField label="IFSC Code" value={student.ifsc} icon={<CreditCard size={16} />} />
                    <InfoField label="Mobile Number" value={student.mobile} icon={<Phone size={16} />} />
                  </div>
                </div>

                {/* Reason for Application */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Application Details</h3>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Reason for Applying *
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                      placeholder="Please explain why you are applying for this scholarship scheme. Include any relevant circumstances or needs that support your application..."
                      rows={4}
                      required
                    />
                    <p className="text-sm text-gray-500">
                      {reason.length}/500 characters
                    </p>
                  </div>
                </div>

                {/* Document Uploads */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Upload className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Required Documents</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Accepted formats: JPG, PNG, PDF (Max size: 5MB each)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["aadhaar", "income", "bonafide", "bankPassbook", "marksheet"].map((docKey) => (
                      <div key={docKey} className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                          {documentIcons[docKey]}
                          {documentLabels[docKey]} *
                        </label>
                        
                        {documents[docKey] ? (
                          <div className="relative bg-white border border-green-200 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                              <FileCheck className="h-5 w-5 text-green-500" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                  {documents[docKey].name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(documents[docKey].size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(docKey)}
                                className="p-1 text-red-500 hover:text-red-700 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                            {uploadProgress[docKey] > 0 && uploadProgress[docKey] < 100 && (
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress[docKey]}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all group-hover:scale-105">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-3 text-gray-400 group-hover:text-blue-500" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span>
                              </p>
                              <p className="text-xs text-gray-500">PDF, PNG, JPG</p>
                            </div>
                            <input
                              type="file"
                              onChange={(e) => handleFileChange(e, docKey)}
                              className="hidden"
                              accept=".jpg,.jpeg,.png,.pdf"
                              required
                            />
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-lg transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin h-5 w-5" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help? Contact support at{" "}
            <a href="mailto:support@pmsss.gov.in" className="text-blue-600 hover:underline">
              support@pmsss.gov.in
            </a>
          </p>
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
    <p className="p-3 bg-white rounded-lg border border-gray-200 text-gray-800">
      {value || "N/A"}
    </p>
  </div>
);