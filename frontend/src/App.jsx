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
import DashboardLayout from "./pages/student/Dashboard";
import StudentDashboardHome from "./pages/student/StudentDashboardHome";

function App() {
  return (
    <Routes>
      {/* Define your routes here */}
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutUs />} />

      <Route path="/student" element={<DashboardLayout />}>
        <Route index element={<StudentDashboardHome />} />
        <Route path="apply" element={<Apply />} />
        {/* <Route path="upload" element={<UploadDocs />} /> */}
        {/* <Route path="status" element={<Status />} /> */}
        {/* <Route path="transactions" element={<Transactions />} /> */}
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
