import React from 'react'
import PhotoCard from './PhotoCard'
import styles from '../css/PhotoList.module.css'

const PhotoList = ({ photos, albumId, review, sentReview }) => {

  return (
    <div className={styles.listWrapper}>
      <div className={styles.photoListWrapper}>
        {photos.map((photo, i) => <PhotoCard key={photo.id} photo={photo} index={i} albumId={albumId} review={review ? true : false} sentReview={sentReview} />)}
      </div>
    </div>
  )
}

export default PhotoList