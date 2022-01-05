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
    navigate('/')
  }

  return (
    <div className={styles.navbarWrapper}>
      <div>LOGO</div>
      {currentUser
        ? <div className={styles.navbarUserWrapper}>
          <button className={styles.navbarUser} onClick={() => setShowDropdown(!showDropdown)}>
            <p>{currentUser.email}</p>
            <i className={`fas ${!showDropdown ? 'fa-angle-down' : 'fa-angle-up'}`}></i>
          </button>
          {showDropdown &&
            <div className={styles.dropdownMenu}>
              <NavLink className={styles.menuItem} to="/albums">Albums</NavLink>
              <button onClick={handleLogout} className={styles.menuItem}>Logout</button>
            </div>}
        </div>
        : <button className={styles.signInBtn} onClick={() => setShowLoginModal(true)}>Sign in</button>
      }

    </div>
  )
}

export default Navbar
