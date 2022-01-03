import React, { useState } from 'react'
import styles from '../css/LoginRegisterBox.module.css'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LoginRegisterBox = () => {
  const [register, setRegister] = useState(false)

  return (
    <div className={styles.loginRegisterBoxWrapper}>
      <div>
        <button onClick={() => setRegister(false)}>Login</button>
        <button onClick={() => setRegister(true)}>Register</button>
      </div>
      { register ? <RegisterForm /> : <LoginForm />}
    </div>
  )
}

export default LoginRegisterBox
