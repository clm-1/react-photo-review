import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../css/Home.module.css'
import heroBG from '../assets/images/hero-bg.jpg'
import pageInfo1 from '../assets/images/page-info-1.jpg'
import pageInfo2 from '../assets/images/page-info-2.jpg'
import pageInfo3 from '../assets/images/page-info-3.jpg'

const Home = ({ setShowLoginModal }) => {
  const { setShowRegisterTab } = useAuthContext()

  // Show login/register modal on button-click
  const handleGetStartedClick = () => {
    setShowRegisterTab(true)
    setShowLoginModal(true)
  }

  // Map out the usps with different icons and text content
  const renderUsps = () => {
    const textAndIcons = [
      ["fas fa-images", 'Class aptent taciti sociosqu maximus mauris'],
      ["fas fa-share-square", 'Ipsum massa fringilla felis eget pretium eu'],
      ["fas fa-check-square", 'Mauris varius erat ut cursus consectetur tellus']]

    return textAndIcons.map((usp, i) => (
      <div key={i} className={styles.usp}>
        <div className={styles.iconWrapper}>
          <i className={usp[0]}></i>
        </div>
        <p>{usp[1]}</p>
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
          <h1>Welcome!</h1>
          <h2>Quisque accumsan sodales urna erat ut cursus, lectus eget dignissim</h2>
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
