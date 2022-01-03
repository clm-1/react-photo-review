import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // listen for changes to auth state
    onAuthStateChanged(auth, (user) => {
      console.log('checking user')
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  const values = {
    currentUser,
    loading,
  }

  return (
    <AuthContext.Provider value={values}>
      { loading && <div>Loading...</div>}
      { !loading && children }
    </AuthContext.Provider>
  )
}

export { useAuthContext, AuthContextProvider as default }
