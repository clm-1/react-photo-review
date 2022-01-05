import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../css/LoginRegisterModal.module.css'

const RegisterForm = ({ setRegister, setShowLoginModal }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const { register } = useAuthContext()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (passwordRef.current.value !== confirmPasswordRef.current.value) return console.log('passwords does not match')

    try {
      await register(emailRef.current.value, passwordRef.current.value)
      setShowLoginModal(false)
      navigate('/albums')
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.formWrapper}>
      <h2>Register</h2>
      <hr />
      <form onSubmit={handleRegister}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" autoComplete="email" ref={emailRef} required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" autoComplete="current-password" ref={passwordRef} required />
        <label htmlFor="confirm-password">Confirm password</label>
        <input type="password" name="confirm-password" autoComplete="current-password" ref={confirmPasswordRef} required />
        <button disabled={loading} className={styles.formSubmitBtn} type="submit">Register</button>
      </form>
      <div className={styles.modalInfoWrapper}>
        <p>Already have an account?</p>
        <button onClick={() => setRegister(false)}>Click here to sign in</button>
      </div>
    </div>
  )
}

export default RegisterForm
