import React from 'react'
import { createDateTimeString } from '../helpers/time'
import styles from '../css/PhotoList.module.css'

const PhotoCard = ({ photo }) => {
  return (
    <div className={styles.photoCardWrapper}>
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
