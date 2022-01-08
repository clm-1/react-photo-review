import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../css/LoginRegisterModal.module.css'

const LoginForm = ({ setRegister, setShowLoginModal }) => {
  const [loading, setLoading] = useState(false)
  const { setShowRegisterTab } = useAuthContext()
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuthContext()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(emailRef.current.value, passwordRef.current.value)
      setLoading(false)
      setShowLoginModal(false)
      navigate('/albums')
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleLogin}>
        <h2>Sign in</h2>
        <hr />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" autoComplete="email" ref={emailRef} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" autoComplete="current-password" ref={passwordRef} />
        <button disabled={loading} className={styles.formSubmitBtn} type="submit">Sign in</button>
      </form>
      <div className={styles.modalInfoWrapper}>
        <p>Don't have an account?</p>
        <button onClick={() => setShowRegisterTab(true)}>Click here to register</button>
      </div>
    </div>
  )
}

export default LoginForm
