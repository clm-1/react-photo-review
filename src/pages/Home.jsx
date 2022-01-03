import React from 'react'
import LoginRegisterBox from '../components/LoginRegisterBox'
import { useAuthContext } from '../contexts/AuthContext'

const Home = () => {
  const { logout } = useAuthContext()

  return (
    <div>
      <h1>Home</h1>
      <LoginRegisterBox />
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
