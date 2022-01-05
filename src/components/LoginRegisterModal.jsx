import React, { useState } from 'react'
import styles from '../css/LoginRegisterModal.module.css'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LoginRegisterModal = ({ setShowLoginModal }) => {
  const [register, setRegister] = useState(false)

  const handleOverlayClick = (e) => {
    e.stopPropagation()
    if (e.target.id === 'overlay') setShowLoginModal(false)
  }

  return (
    <div id="overlay" onClick={(e) => handleOverlayClick(e)} className={styles.loginRegisterModalOverlay}>
      <div className={styles.loginRegisterModalWrapper}>
        <div onClick={() => setShowLoginModal(false)} className={styles.closeModalWrapper}>
          <i className="far fa-times-circle"></i>
        </div>
        {register ? <RegisterForm setRegister={setRegister} /> : <LoginForm setRegister={setRegister} />}
      </div>
    </div>
  )
}

export default LoginRegisterModal
