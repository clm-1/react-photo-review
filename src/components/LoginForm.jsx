import React, { useRef, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../css/LoginForm.module.css'

const LoginForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuthContext()

  const handleLogin = async (e) => {
    e.preventDefault()
    
    try {
      login(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      Login
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" autoComplete="email" ref={emailRef} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" autoComplete="current-password" ref={passwordRef} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
