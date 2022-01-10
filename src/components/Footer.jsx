import React from 'react'
import styles from '../css/Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={styles.toTopBtn}>
        <i className="fas fa-chevron-up"></i>
      </div>
      <div className={styles.footerContent}>
        <h2>imgReview</h2>
        <p>with react and firebase</p>
      </div>
    </div>
  )
}

export default Footer
