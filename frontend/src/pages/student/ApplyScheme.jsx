import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const token =
    localStorage.getItem("token") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzlhZDI1OWJlOWUxZDZmYTkxNWQwZCIsImlhdCI6MTc1ODEwODg4NywiZXhwIjoxNzU4MTEyNDg3fQ.9353nKaqkYiDwAkMdR3JHIe3lXORaAK68_kK0xmfDpg";

  useEffect(() => {
    // Fetch logged-in student details from backend
    const fetchStudent = async () => {
      if (!token) {
        setError("Authentication required. Please login again.");
        setIsLoading(false);
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

    setDocuments({ ...documents, [field]: file });
    setError(""); // Clear previous errors
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
        navigate("/dashboard");
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
    return new Date(dateString).toLocaleDateString("en-IN");
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Apply for Scheme
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {!student ? (
        <p className="text-gray-500">Failed to load student details. Please try again.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Student Info (Read-only display) */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Student Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
              <div>
                <p className="font-medium">Full Name</p>
                <p className="text-gray-600">{student.fullName || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium">Date of Birth</p>
                <p className="text-gray-600">{formatDate(student.dob)}</p>
              </div>
              <div>
                <p className="font-medium">Bank Name</p>
                <p className="text-gray-600">{student.bankName || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium">Account Number</p>
                <p className="text-gray-600">
                  {student.accountNumber 
                    ? `****${student.accountNumber.slice(-4)}` 
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="font-medium">IFSC Code</p>
                <p className="text-gray-600">{student.ifsc || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium">Mobile Number</p>
                <p className="text-gray-600">{student.mobile || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Reason for applying */}
          <div>
            <label className="block font-medium mb-2">
              Reason for Applying *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Explain why you are applying for this scheme..."
              rows={4}
              required
            />
          </div>

          {/* Document Uploads */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Upload Documents *
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Accepted formats: JPG, PNG, PDF (Max size: 5MB each)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: "aadhaar", label: "Aadhaar Card" },
                { key: "income", label: "Income Certificate" },
                { key: "bonafide", label: "College Bonafide" },
                { key: "bankPassbook", label: "Bank Passbook" },
                { key: "marksheet", label: "Previous Year Marksheet" },
              ].map((doc) => (
                <div key={doc.key}>
                  <label className="block font-medium mb-2">{doc.label}</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, doc.key)}
                    className="w-full p-2 border rounded"
                    accept=".jpg,.jpeg,.png,.pdf"
                    required
                  />
                  {documents[doc.key] && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ {documents[doc.key].name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${
                isSubmitting 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white py-3 px-6 rounded-lg font-semibold transition-colors`}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}