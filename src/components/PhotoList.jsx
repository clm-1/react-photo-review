import React from 'react'
import { useNavigate } from 'react-router-dom'
import PhotoCard from './PhotoCard'
import styles from '../css/PhotoList.module.css'

const PhotoList = ({ photos }) => {

  return (
    <div className={styles.photoListWrapper}>
      { photos.map((photo, i) => <PhotoCard key={photo.id} photo={photo} index={[i, photos.length]}/>)}
    </div>
  )
}

export default PhotoList