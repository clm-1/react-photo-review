import React from 'react'
import { createDateTimeString } from '../helpers/time'
import styles from '../css/PhotoList.module.css'
import { usePhotoContext } from '../contexts/PhotoContext'
import useDeletePhotos from '../hooks/useDeletePhotos'

const PhotoCard = ({ photo, index, albumId }) => {
  const { setPhotoToShow, chosenPhotos, notChosenPhotos, setPhotoReviewError } = usePhotoContext()
  const deletePhoto = useDeletePhotos()

  const handlePhotoClick = () => {
    console.log(index)
    setPhotoToShow({ current: index })
    setPhotoReviewError(null)
  }

  const handleDeletePhoto = (e) => {
    e.stopPropagation()
    deletePhoto.deleteOne(photo, albumId)
  }

  return (
    <div 
      onClick={handlePhotoClick} 
      className={`
        ${styles.photoCardWrapper}
        ${chosenPhotos.includes(photo) ? styles.photoChosen : ''}
        ${notChosenPhotos.includes(photo) ? styles.photoNotChosen : ''}`}>
      <div className={styles.photoCardImgWrapper}>
        <img src={photo.url} alt={photo.name}></img>
        <button className={styles.deletePhoto} onClick={handleDeletePhoto}><i className="fas fa-trash-alt"></i></button>
      </div>
      {/* <div className={styles.photoCardInfo}>
        <h3 className={styles.title}>{photo.name}</h3>
        <p>{createDateTimeString(photo?.created)}</p>
      </div> */}
    </div>
  )
}

export default PhotoCard
