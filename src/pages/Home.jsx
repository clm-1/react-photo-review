import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../css/Home.module.css'
import heroBG from '../assets/images/hero-bg.jpg'

const Home = () => {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.heroWrapper}>
        <img src={heroBG} alt="homepage background"/>
      </div>
    </div>
  )
}

export default Home
