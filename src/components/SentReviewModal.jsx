import React from 'react'
import styles from '../css/LoginRegisterModal.module.css'

const SentReviewModal = ({ setShowSentModal }) => {

  const handleOverlayClick = (e) => {
    e.stopPropagation()
    if (e.target.id === 'overlay') setShowSentModal(false)
  }

  return (
    <div id="overlay" onClick={(e) => handleOverlayClick(e)} className={styles.loginRegisterModalOverlay}>
      <div className={styles.loginRegisterModalWrapper}>
        <div className={styles.closeModalWrapper} onClick={() => setShowSentModal(false)}>
          <i className="far fa-times-circle"></i>
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.reviewSentMsg}>
            <h2>Thank you!</h2>
            <p>Your review was successfully sent</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SentReviewModal
