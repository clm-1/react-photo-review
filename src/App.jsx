import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import { ReactQueryDevtools } from 'react-query/devtools'
import Albums from './pages/Albums'
import Home from './pages/Home'
import Album from './pages/Album'
import Navbar from './components/Navbar'
import LoginRegisterModal from './components/LoginRegisterModal'
import ReviewAlbum from './pages/ReviewAlbum'
import Footer from './components/Footer'

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <div className="App">
      <Navbar setShowLoginModal={setShowLoginModal}/>
      <div className="pageContainer">
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
              <Album />
            </RequireAuth>
          } />
        </Routes>
      </div>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  )
}

export default App
