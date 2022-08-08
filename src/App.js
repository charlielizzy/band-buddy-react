import './App.css'
import React, { useState } from 'react'
import Home from './Pages/Home'
import AuthCallback from './Pages/AuthCallback'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
