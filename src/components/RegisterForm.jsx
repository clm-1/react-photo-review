import React, { useRef, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../css/LoginForm.module.css'

const LoginForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const { register } = useAuthContext()

  const handleRegister = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== confirmPasswordRef.current.value) return console.log('passwords does not match')

    try {
      await register(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      Register
      <form onSubmit={handleRegister}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" autoComplete="email" ref={emailRef} required/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" autoComplete="current-password" ref={passwordRef} required/>
        <label htmlFor="confirm-password">Confirm password</label>
        <input type="password" name="confirm-password" autoComplete="current-password" ref={confirmPasswordRef} required/>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default LoginForm
