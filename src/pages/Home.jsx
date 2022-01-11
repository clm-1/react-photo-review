import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../css/Home.module.css'
import heroBG from '../assets/images/hero-bg.jpg'
import pageInfo1 from '../assets/images/page-info-1.jpg'
import pageInfo2 from '../assets/images/page-info-2.jpg'
import pageInfo3 from '../assets/images/page-info-3.jpg'

const Home = ({ setShowLoginModal }) => {
  const { setShowRegisterTab } = useAuthContext()

  const handleGetStartedClick = () => {
    setShowRegisterTab(true)
    setShowLoginModal(true)
  }

  // Map out the usps with different icons and text content
  const renderUsps = () => {
    const textAndIcons = [
      ["fas fa-images", 'Quickly create photo albums'],
      ["fas fa-share-square", 'Share easily with your clients'],
      ["fas fa-check-square", 'Get back a reviewed album']]

    return textAndIcons.map((usp, i) => (
      <div key={i} className={styles.usp}>
        <i className={usp[0]}></i>
        <h3>{usp[1]}</h3>
      </div>
    ))
  }

  const renderInfoImgs = () => {
    const infoItems = [
      [pageInfo1, 'Lorem ipsum', 'Mauris sollicitudin leo arcu, sed tincidunt elit rutrum nec. Duis eu neque rutrum, auctor quam sit amet, tristique sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris non.'],
      [pageInfo2, 'Interdum mauris cursus', 'Duis eu neque rutrum, auctor quam sit amet, tristique sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra.'],
      [pageInfo3, 'Donec sed maximus', 'Mauris sollicitudin leo arcu, sed tincidunt elit rutrum nec, tristique sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra.'],
    ]

    return infoItems.map((item, i) => (
      <div key={i} className={styles.aboutItem}>
        <div className={styles.aboutImgWrapper}>
          <img src={item[0]}></img>
        </div>
        <div className={styles.aboutText}>
          <h3>{item[1]}</h3>
          <p>{item[2]}</p>
        </div>
      </div>
    ))
  }

  return (
    <div className={styles.homeWrapper}>
      <header className={styles.heroWrapper}>
        <img src={heroBG} alt="homepage background" />
        <div className={styles.homepageMessage}>
          {/* <h1>Welcome</h1> */}
          <h1>Welcome, photographers!</h1>
          <h2>We make it easy for you to create and share albums with your clients</h2>
          <button className={styles.homepageRegisterBtn} onClick={handleGetStartedClick}>Get started</button>
        </div>
      </header>

      <section className={styles.pageInfo}>
        <div className={styles.uspWrapper}>
          {renderUsps()}
        </div>
      </section>
      <hr />
      <section className={styles.aboutWrapper}>
        {renderInfoImgs()}
      </section>
      <hr />
      <section className={styles.recommendationText}>
        <p>"Auctor quam sit amet, tristique sapien. Class aptent taciti sociosqu, class aptent taciti sociosqu ad litora torquent per conubia nostra."</p>
        <p>- A photographer</p>
      </section>
    </div>
  )
}

export default Home
