import React from 'react'
import { createDateTimeString } from '../helpers/time'
import styles from '../css/PhotoList.module.css'
import { usePhotoContext } from '../contexts/PhotoContext'
import useDeletePhotos from '../hooks/useDeletePhotos'

const PhotoCard = ({ photo, index, albumId, review, sentReview }) => {
  const { setPhotoToShow, chosenPhotos, setChosenPhotos, notChosenPhotos, setPhotoReviewError, createNewAlbum, currentAlbum, setNotChosenPhotos } = usePhotoContext()
  const deletePhoto = useDeletePhotos()

  const handlePhotoClick = () => {
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

  const handleChoiceClick = (e, chosen) => {
    e.stopPropagation()
    if (chosen && !chosenPhotos.includes(photo)) {
      setNotChosenPhotos(prev => prev.filter(currPhoto => photo.id !== currPhoto.id))
      setChosenPhotos(prev => [...prev, photo])
    }

    if (!chosen && !notChosenPhotos.includes(photo)) {
      setChosenPhotos(prev => prev.filter(currPhoto => photo.id !== currPhoto.id))
      setNotChosenPhotos(prev => [...prev, photo])
    }
  }

  const renderChoiceBtns = () => {
    const inNotChosen = notChosenPhotos.filter(currPhoto => currPhoto.id === photo.id).length
    const inChosen = chosenPhotos.filter(currPhoto => currPhoto.id === photo.id).length

    const renderJsx = (approved = null) => {
      return (
        <div className={`${styles.choiceMark}`}>
          <i onClick={(e) => handleChoiceClick(e, false)} className={`fas fa-times-circle ${styles.reject} ${approved !== null && approved && styles.dim}`}></i>
          <i onClick={(e) => handleChoiceClick(e, true)} className={`fas fa-check-circle ${styles.approve} ${approved !== null && !approved && styles.dim}`}></i>
        </div>
      )
    }

    if (inChosen === 0 && inNotChosen === 0) return renderJsx()
    if (inChosen > 0) return renderJsx(true)
    if (inNotChosen > 0) return renderJsx(false)
  }

  return (
    <div
      onClick={handlePhotoClick}
      className={`${styles.photoCardWrapper} ${deletePhoto.isDeleting ? styles.isDeletingPhoto : ''}`}>
      {!review &&
        <div className={styles.photoCheckBox} onClick={handleCheckBoxClick}>
          {chosenPhotos.includes(photo) &&
            <i className="fas fa-check"></i>}
        </div>}
      <div className={`${styles.photoCardImgWrapper}`}>
        {review && !sentReview && renderChoiceBtns()}
        <img className={`${notChosenPhotos.filter(currPhoto => currPhoto.id === photo.id).length ? styles.dimImg : ''}`} src={photo.url} alt={photo.name}></img>
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
