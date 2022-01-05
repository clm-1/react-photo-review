import React from 'react'
import styles from '../css/Navbar.module.css'

const Navbar = ({ setShowLoginModal }) => {
  return (
    <div className={styles.navbarWrapper}>
      <div>LOGO</div>
      <div onClick={() => setShowLoginModal(true)}>Sign in</div>
    </div>
  )
}

export default Navbar
