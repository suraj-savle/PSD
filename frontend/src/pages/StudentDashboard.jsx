import { useState } from "react";

export default function StudentDashboard() {
  // demo user data (replace with API data later)
  const [user] = useState({
    name: "Suraj Savle",
    dob: "15-08-2003",
    gender: "Male",
    mobile: "9876543210",
    scholarshipStatus: "Pending Verification",
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-700 text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">PMSSS Scholarship Portal</h1>
          <button className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="flex-grow max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome, {user.name} 👋
        </h2>

        {/* Profile Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p><span className="font-medium">Full Name:</span> {user.name}</p>
            <p><span className="font-medium">Date of Birth:</span> {user.dob}</p>
            <p><span className="font-medium">Gender:</span> {user.gender}</p>
            <p><span className="font-medium">Mobile:</span> {user.mobile}</p>
          </div>
        </div>

        {/* Scholarship Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Scholarship Status</h3>
          <p className="text-gray-700">
            Current Status:{" "}
            <span
              className={`font-bold ${
                user.scholarshipStatus.includes("Pending")
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {user.scholarshipStatus}
            </span>
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/upload-documents"
              className="bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 transition text-center"
            >
              📄 Upload Documents
            </a>
            <a
              href="/track-application"
              className="bg-green-600 text-white p-4 rounded-lg shadow hover:bg-green-700 transition text-center"
            >
              📊 Track Application
            </a>
            <a
              href="/bank-details"
              className="bg-purple-600 text-white p-4 rounded-lg shadow hover:bg-purple-700 transition text-center"
            >
              🏦 Bank Details
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 text-center text-gray-600 text-sm border-t">
        © {new Date().getFullYear()} PMSSS Scholarship | AICTE
      </footer>
    </div>
  );
}
