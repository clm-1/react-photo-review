import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

// For protected paths, return to home if not logged in
const RequireAuth = ({ children }) => {
  const { currentUser } = useAuthContext()

  return (
    currentUser ? children : <Navigate to={'/'} />
  )
}

export default RequireAuth