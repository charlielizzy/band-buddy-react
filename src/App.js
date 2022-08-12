import './App.css'
import React, { useState } from 'react'
import Home from './Pages/Home'
import AuthCallback from './Pages/AuthCallback'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthorisedContext } from './Context'

function App() {
  return (
    <AuthorisedContext.Provider 
    // value={{ authorised, setAuthorised}}
    >
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        
        
      </Routes>
    </BrowserRouter>
    </AuthorisedContext.Provider>
  )
}

export default App
