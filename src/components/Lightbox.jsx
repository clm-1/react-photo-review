import React from 'react'
import { usePhotoContext } from '../contexts/PhotoContext'
import styles from '../css/Lightbox.module.css'

const Lightbox = ({ photo }) => {
  const { setPhotoToShow, photoToShow } = usePhotoContext()
  
  const handleLightboxClick = () => {
    setPhotoToShow(null)
  }

  const handleArrowClick = (e, direction) => {
    e.stopPropagation()
    const check = direction === 'left'
      ? [-1, 0, photoToShow.total - 1]
      : [1, photoToShow.total - 1, 0]

    return setPhotoToShow(prev => (
      { ...prev, current: prev.current !== check[1] ? prev.current + check[0] : check[2]}
    ))
  }

  return (
    <div onClick={handleLightboxClick} className={styles.lightboxWrapper}>
      <div className={styles.lightboxImgWrapper}>
        <div onClick={(e) => handleArrowClick(e, 'left')} className={`${styles.lightboxArrow} ${styles.left}`}>
          <p>{`<`}</p>
        </div>
        <img src={photo.url} alt={photo.name} />
        <div onClick={(e) => handleArrowClick(e, 'right')} className={`${styles.lightboxArrow} ${styles.right}`}>
          <p>{`>`}</p>
        </div>
      </div>
    </div>
  )
}

export default Lightbox
