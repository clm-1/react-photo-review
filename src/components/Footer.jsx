import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../css/Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={styles.toTopBtn}>
        <i className="fas fa-chevron-up"></i>
      </div>
      <div className={styles.footerContent}>
        <NavLink className={styles.logoLink} to="/"><i className="fas fa-camera-retro"></i>imgReview</NavLink>
        <hr />
        <p>with react and firebase</p>
      </div>
    </div>
  )
}

export default Footer
