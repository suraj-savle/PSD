import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Landing from './pages/Landing'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'

function App() {
  return (
    <Routes>
      {/* Define your routes here */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
    </Routes>
  )
}

export default App