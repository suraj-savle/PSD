import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'

function App() {
  return (
    <Routes>
      {/* Define your routes here */}
        <Route path="/signup" element={<Register />} />
    </Routes>
  )
}

export default App