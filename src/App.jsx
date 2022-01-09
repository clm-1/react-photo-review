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
              <Album />
            </RequireAuth>
          } />
        </Routes>
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  )
}

export default App
