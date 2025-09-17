"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, FileText, CheckCircle, XCircle, Clock } from "lucide-react";

export default function StudentDashboardHome() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzlhZDI1OWJlOWUxZDZmYTkxNWQwZCIsImlhdCI6MTc1ODEyMzYyNSwiZXhwIjoxNzU4MTI3MjI1fQ.3eYWrbaNdyLSHKWCk4a3n4VnFLSK_YDnYv3rj71Rvjg";

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/student/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStudent(data);
      } catch (err) {
        console.error("Error fetching student:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center text-gray-600 mt-10">
        Failed to load student data.
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-6 shadow-lg mb-6">
        <h2 className="text-2xl font-bold">
          Welcome back, {student.firstName} 👋
        </h2>
        <p className="text-sm mt-2">
          Manage your scholarship applications and track progress here.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-700">Applications</h3>
              <p className="text-gray-900">{student.applications?.length || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-700">Approved</h3>
              <p className="text-gray-900">
                {student.applications?.filter(a => a.status === "approved").length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <Clock className="text-yellow-500" />
            <div>
              <h3 className="font-semibold text-gray-700">Pending</h3>
              <p className="text-gray-900">
                {student.applications?.filter(a => a.status === "pending").length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <XCircle className="text-red-600" />
            <div>
              <h3 className="font-semibold text-gray-700">Rejected</h3>
              <p className="text-gray-900">
                {student.applications?.filter(a => a.status === "rejected").length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/student/apply"
          className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm transition"
        >
          <h3 className="font-semibold text-lg text-blue-700 mb-2">
            Apply for Scholarship
          </h3>
          <p className="text-gray-600 text-sm">
            Submit your documents and apply for new schemes.
          </p>
        </Link>

        <Link
          to="/student/profile"
          className="bg-green-50 hover:bg-green-100 p-6 rounded-xl border border-green-200 shadow-sm transition"
        >
          <h3 className="font-semibold text-lg text-green-700 mb-2">
            View / Update Profile
          </h3>
          <p className="text-gray-600 text-sm">
            Keep your details updated to avoid delays in approval.
          </p>
        </Link>
      </div>
    </div>
  );
}