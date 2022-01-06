import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Albums from './pages/Albums'
import Home from './pages/Home'
import { Container } from 'react-bootstrap'
import OneAlbum from './pages/OneAlbum'
import ReviewAlbum from './pages/ReviewAlbum'
import Navbar from './components/Navbar'
import LoginRegisterModal from './components/LoginRegisterModal'

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <div className="App">
      <div className="pageContainer">
        <Navbar setShowLoginModal={setShowLoginModal}/>
        { showLoginModal && <LoginRegisterModal setShowLoginModal={setShowLoginModal}/>}
        <Routes>
          <Route path="/" element={<Home setShowLoginModal={setShowLoginModal} />} />
          <Route path="/review-album/:ownerId/:albumId" element={<ReviewAlbum />} />

          {/* Protected */}
          <Route path="/albums" element={
            <RequireAuth>
              <Albums />
            </RequireAuth>
          } />

          <Route path="/albums/:albumId" element={
            <RequireAuth>
              <OneAlbum />
            </RequireAuth>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default App
