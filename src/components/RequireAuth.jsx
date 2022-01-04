import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const RequireAuth = ({ children }) => {
  const { currentUser } = useAuthContext()

  return (
    currentUser ? children : <Navigate to={'/'} />
  )
}

export default RequireAuth