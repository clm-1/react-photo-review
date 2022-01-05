import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Albums from './pages/Albums'
import Home from './pages/Home'
import { Container } from 'react-bootstrap'
import OneAlbum from './pages/OneAlbum'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

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
  )
}

export default App
