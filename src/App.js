import './App.css'
import React, { useState } from 'react'
import Home from './Pages/Home'
import AuthCallback from './Pages/AuthCallback'
import Spotify from './Pages/Spotify'
import { Account } from './Pages/Account'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './Context'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth-callback" element={<AuthCallback />} />
          <Route path="/track/:spotifyTrackID" element={<Spotify />} />
          <Route path="/user/:userSpotifyID" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
