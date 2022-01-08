import React from 'react'
import styles from '../css/ReviewCard.module.css'
import noThumbnail from '../assets/images/no-thumbnail.png'

const ReviewCard = ({ album }) => {
  return (
    <div className={styles.reviewCardWrapper}>
      <div className={styles.reviewCardImgWrapper}>
        <img src={album.thumbnail ? album.thumbnail : noThumbnail}></img>
      </div>
      <div className={styles.reviewCardInfo}>
        <h2>{album.name}</h2>
        <div className={styles.reviewedBy}>
          <h3>by Guybrush</h3>
          <p className={styles.dot}>·</p>
          <p className={styles.dateReviewed}>2020-22-32 21:23:23</p>
        </div>
        <p className={styles.reviewComment}>This is a short comment about the images chosen</p>
      </div>
    </div>
  )
}

export default ReviewCard
