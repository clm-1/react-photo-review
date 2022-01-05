import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../css/Home.module.css'
import heroBG from '../assets/images/hero-bg.jpg'

const Home = () => {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.heroWrapper}>
        <img src={heroBG} alt="homepage background"/>
        <div className={styles.homepageMessage}>
          {/* <h1>Welcome</h1> */}
          <h1>Hello Photographers!</h1>
          <h2>We make it easy for you to create and share albums with your clients</h2>
          <button className={styles.homepageRegisterBtn}>Get started</button>
        </div>
      </div>
    </div>
  )
}

export default Home
