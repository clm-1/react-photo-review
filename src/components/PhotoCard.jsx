import React from 'react'
import { createDateTimeString } from '../helpers/time'
import styles from '../css/PhotoList.module.css'
import { usePhotoContext } from '../contexts/PhotoContext'
import useDeletePhotos from '../hooks/useDeletePhotos'

const PhotoCard = ({ photo, index, albumId, review }) => {
  const { setPhotoToShow, chosenPhotos, setChosenPhotos, notChosenPhotos, setPhotoReviewError, createNewAlbum } = usePhotoContext()
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

  const handleCheckBoxClick = (e) => {
    e.stopPropagation()
    if (!chosenPhotos.includes(photo)) setChosenPhotos(prev => [...prev, photo])
    else setChosenPhotos(prev => prev.filter(currPhoto => currPhoto !== photo))
  }

  return (
    <div
      onClick={handlePhotoClick}
      className={`${styles.photoCardWrapper}`}>
      {!review &&
        <div className={styles.photoCheckBox} onClick={handleCheckBoxClick}>
          {chosenPhotos.includes(photo) &&
            <i className="fas fa-check"></i>}
        </div>}
      <div className={`${styles.photoCardImgWrapper}`}>
        {chosenPhotos.includes(photo) && review &&
          <div className={styles.choiceMark}>
            <i className="fas fa-check-circle"></i>
          </div>
        }
        {notChosenPhotos.includes(photo) && review &&
          <div className={`${styles.choiceMark} ${styles.rejected}`}>
            <i className="fas fa-times-circle"></i>
          </div>
        }
        <img src={photo.url} alt={photo.name}></img>
        {!review && !createNewAlbum && <button className={styles.deletePhoto} onClick={handleDeletePhoto}><i className="fas fa-trash-alt"></i></button>}
      </div>
      <div className={styles.photoCardInfo}>
        <h3 className={styles.title}>{photo.name}</h3>
        <p>{createDateTimeString(photo?.created)}</p>
      </div>
    </div>
  )
}

export default PhotoCard
