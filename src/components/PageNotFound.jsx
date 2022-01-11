import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/PageNotFound.module.css'

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.pageNotFoundWrapper}>
      <div className={styles.pageNotFoundContent}>
        <i className="far fa-window-close"></i>
        <p>Page not found</p>
        <hr />
        <button onClick={() => navigate('/')}>To homepage</button>
      </div>
    </div>
  )
}

export default PageNotFound
