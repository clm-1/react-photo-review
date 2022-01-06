import React from 'react'
import { createDateTimeString } from '../helpers/time'
import styles from '../css/PhotoList.module.css'
import { usePhotoContext } from '../contexts/PhotoContext'

const PhotoCard = ({ photo, index }) => {
  const { setPhotoToShow } = usePhotoContext()

  const handlePhotoClick = () => {
    console.log(index)
    setPhotoToShow({ current: index })
  }

  return (
    <div onClick={handlePhotoClick} className={styles.photoCardWrapper}>
      <div className={styles.photoCardImgWrapper}>
        <img src={photo.url} alt={photo.name}></img>
      </div>
      {/* <div className={styles.photoCardInfo}>
        <h3 className={styles.title}>{photo.name}</h3>
        <p>{createDateTimeString(photo?.created)}</p>
      </div> */}
    </div>
  )
}

export default PhotoCard
