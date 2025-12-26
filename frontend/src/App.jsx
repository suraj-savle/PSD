import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Apply from "./pages/student/ApplyScheme";
import AboutUs from "./pages/AboutUs";
// import UploadDocs from "./pages/student/UploadDocs";
// import Status from "./pages/student/Status";
// import Transactions from "./pages/student/Transactions";
import Profile from "./pages/student/Profile";
import DashboardLayout from "./pages/StudentDashboard/Dashboard";
import StudentDashboardHome from "./pages/student/StudentDashboardHome";
import FinanceDashboard from "./pages/finance/Dashboard";
import FinanceDashboardHome from "./pages/finance/FinanceDashboardHome";
import FinanceLogin from "./pages/finance/FinanceLogin";
import ApprovedStudents from "./pages/finance/ApprovedStudents";
import Disbursements from "./pages/finance/Disbursements";
import Transactions from "./pages/finance/Transactions";
import Settings from "./pages/finance/Settings";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";

function App() {
  return (
    <Routes>
      {/* Define your routes here */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutUs />} />

      <Route path="/student" element={<DashboardLayout />}>
        <Route index element={<StudentDashboardHome />} />
        <Route path="apply" element={<Apply />} />
        {/* <Route path="upload" element={<UploadDocs />} /> */}
        {/* <Route path="status" element={<Status />} /> */}
        {/* <Route path="transactions" element={<Transactions />} /> */}
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/finance" element={<FinanceDashboard />}>
        <Route index element={<FinanceDashboardHome />} />
        <Route path="approved" element={<ApprovedStudents />} />
        <Route path="disbursements" element={<Disbursements />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
