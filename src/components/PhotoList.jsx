import React from 'react'
import { useNavigate } from 'react-router-dom'
import PhotoCard from './PhotoCard'
import styles from '../css/PhotoList.module.css'

const PhotoList = ({ photos }) => {

  return (
    <div className={styles.photoListWrapper}>
      { photos.map(photo => <PhotoCard key={photo.id} photo={photo}/>)}
    </div>
  )
}

export default PhotoList