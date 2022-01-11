import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../css/Navbar.module.css'

const Navbar = ({ setShowLoginModal }) => {
  const { currentUser, logout } = useAuthContext()
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    setShowDropdown(false)
    navigate('/')
  }

  return (
    <nav className={styles.navbarWrapper}>
      <div className={styles.navContents}>
        <NavLink className={styles.logoLink} to="/"><i className="fas fa-camera-retro"></i>imgReview</NavLink>
        <div className={styles.navItems}>
          {currentUser ? <><NavLink to="/albums">My Albums</NavLink>
            <button onClick={handleLogout}>Logout</button></> : <button className={styles.signInBtn} onClick={() => setShowLoginModal(true)}>Sign in</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
