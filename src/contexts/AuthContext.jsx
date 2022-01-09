import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut} from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
  const [showRegisterTab, setShowRegisterTab] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Register user
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Login user
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    // listen for changes to auth state
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  const values = {
    currentUser,
    loading,
    register,
    logout,
    login,
    showRegisterTab,
    setShowRegisterTab
  }

  return (
    <AuthContext.Provider value={values}>
      { loading && <div>Loading...</div>}
      { !loading && children }
    </AuthContext.Provider>
  )
}

export { useAuthContext, AuthContextProvider as default }
