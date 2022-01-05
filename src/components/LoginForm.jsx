import React, { useRef, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../css/LoginRegisterModal.module.css'

const LoginForm = ({ setRegister }) => {
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuthContext()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      login(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
      console.log(error.message)
    } finally {
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
        <button onClick={() => setRegister(true)}>Click here to register</button>
      </div>
    </div>
  )
}

export default LoginForm
