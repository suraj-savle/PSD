"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, FileText, CheckCircle, XCircle, Clock } from "lucide-react";

export default function StudentDashboardHome() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const token =
    localStorage.getItem("token") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzlhZDI1OWJlOWUxZDZmYTkxNWQwZCIsImlhdCI6MTc1ODEyMzYyNSwiZXhwIjoxNzU4MTI3MjI1fQ.3eYWrbaNdyLSHKWCk4a3n4VnFLSK_YDnYv3rj71Rvjg";

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
        <Loader className="animate-spin h-12 w-12 text-indigo-600" />
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
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {student.firstName} 👋
        </h2>
        <p className="text-sm mt-3 text-indigo-100">
          Manage your scholarship applications and track progress here.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <FileText className="text-indigo-600 w-8 h-8" />
            <div>
              <h3 className="font-semibold text-gray-700">Applications</h3>
              <p className="text-2xl font-bold text-gray-900">
                {student.applications?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <CheckCircle className="text-green-600 w-8 h-8" />
            <div>
              <h3 className="font-semibold text-gray-700">Approved</h3>
              <p className="text-2xl font-bold text-gray-900">
                {student.applications?.filter((a) => a.status === "approved")
                  .length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <Clock className="text-yellow-500 w-8 h-8" />
            <div>
              <h3 className="font-semibold text-gray-700">Pending</h3>
              <p className="text-2xl font-bold text-gray-900">
                {student.applications?.filter((a) => a.status === "pending")
                  .length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <XCircle className="text-red-600 w-8 h-8" />
            <div>
              <h3 className="font-semibold text-gray-700">Rejected</h3>
              <p className="text-2xl font-bold text-gray-900">
                {student.applications?.filter((a) => a.status === "rejected")
                  .length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/student/apply"
          className="bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 p-6 rounded-2xl border border-indigo-200 shadow-sm transition transform hover:-translate-y-1"
        >
          <h3 className="font-semibold text-lg text-indigo-700 mb-2">
            Apply for Scholarship
          </h3>
          <p className="text-gray-600 text-sm">
            Submit your documents and apply for new schemes.
          </p>
        </Link>

        <Link
          to="/student/profile"
          className="bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 p-6 rounded-2xl border border-green-200 shadow-sm transition transform hover:-translate-y-1"
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
