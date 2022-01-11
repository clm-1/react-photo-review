import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../css/LoginRegisterModal.module.css'

const RegisterForm = ({ setShowLoginModal }) => {
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const { register, setShowRegisterTab } = useAuthContext()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Set error and return of the two password inputs do not match
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setIsError(true)
      setError('The passwords do not match')
      setLoading(false)
      return
    }

    try {
      await register(emailRef.current.value, passwordRef.current.value)
      setShowLoginModal(false)
      navigate('/albums')
    } catch (error) {
      setIsError(true)
      // Set different error messages depending on what error firebase throws
      if (error.message.includes('Password')) setError('Password should be at least 6 characters')
      if (error.message.includes('auth/invalid-email')) setError('Please enter a valid email')
      if (error.message.includes('auth/email-already-in-use')) setError('That email is already registered')
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
        {isError &&
        <div className={styles.errorWrapper}>
          <p>{error}</p>
          </div>}
        <button disabled={loading} className={styles.formSubmitBtn} type="submit">Register</button>
      </form>
      <div className={styles.modalInfoWrapper}>
        <p>Already have an account?</p>
        <button onClick={() => setShowRegisterTab(false)}>Click here to sign in</button>
      </div>
    </div>
  )
}

export default RegisterForm
