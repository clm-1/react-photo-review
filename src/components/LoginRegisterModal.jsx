import React, { useEffect } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../css/LoginRegisterModal.module.css'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LoginRegisterModal = ({ setShowLoginModal }) => {
  const { showRegisterTab, setShowRegisterTab } = useAuthContext()

  // Close modal if overlay is clicked
  const handleOverlayClick = (e) => {
    e.stopPropagation()
    if (e.target.id === 'overlay') setShowLoginModal(false)
  }

  useEffect(() => {
    return () => {
      setShowRegisterTab(false)
    }
  }, [])

  return (
    <div id="overlay" onClick={(e) => handleOverlayClick(e)} className={styles.loginRegisterModalOverlay}>
      <div className={styles.loginRegisterModalWrapper}>
        <div onClick={() => setShowLoginModal(false)} className={styles.closeModalWrapper}>
          <i className="far fa-times-circle"></i>
        </div>
        { showRegisterTab ? <RegisterForm setShowLoginModal={setShowLoginModal} /> : <LoginForm setShowLoginModal={setShowLoginModal} />}
      </div>
    </div>
  )
}

export default LoginRegisterModal
