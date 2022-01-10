import React, { useEffect } from 'react'
import { usePhotoContext } from '../contexts/PhotoContext'
import styles from '../css/Lightbox.module.css'

const Lightbox = ({ photo, review = false, reviewSent }) => {
  const { setPhotoToShow, photoToShow, setChosenPhotos, chosenPhotos, currentAlbum, notChosenPhotos, setNotChosenPhotos } = usePhotoContext()

  const handleLightboxClick = () => {
    setPhotoToShow(null)
  }

  useEffect(() => {
    console.log('chosen: ', chosenPhotos)
  }, [chosenPhotos])

  // Change image shown in lightbox on arrow-click
  const handleArrowClick = (e, direction) => {
    e.stopPropagation()
    const check = direction === 'left'
      ? [0, -1, currentAlbum.length - 1]
      : [currentAlbum.length - 1, 1, 0]

    return setPhotoToShow(prev => (
      { ...prev, current: prev.current !== check[0] ? prev.current + check[1] : check[2] }
    ))
  }

  // Handle yes/no-click for each photo in lightbox
  // Change to next photo no matter which one is clicked
  const handleChoiceClick = (e, chosen) => {
    e.stopPropagation()
    if (chosen && !chosenPhotos.includes(currentAlbum[photoToShow.current])) {
      console.log('photo added to chosen')
      setNotChosenPhotos(prev => prev.filter(photo => photo.id !== currentAlbum[photoToShow.current].id))
      setChosenPhotos(prev => [...prev, currentAlbum[photoToShow.current]])
    }

    if (!chosen && !notChosenPhotos.includes(currentAlbum[photoToShow.current])) {
      console.log('photo added to NOT chosen')
      setChosenPhotos(prev => prev.filter(photo => photo.id !== currentAlbum[photoToShow.current].id))
      setNotChosenPhotos(prev => [...prev, currentAlbum[photoToShow.current]])
    }

    if (photoToShow.current === currentAlbum.length - 1) return setPhotoToShow(null)
    setPhotoToShow(prev => (
      { ...prev, current: prev.current !== currentAlbum.length - 1 ? prev.current + 1 : 0 }
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
        {review && !reviewSent &&
          <div className={styles.lightBoxControlls}>
            <i onClick={(e) => handleChoiceClick(e, false)} className={`far fa-times-circle reject ${styles.reject}`}></i>
            <i onClick={(e) => handleChoiceClick(e, true)} className={`far fa-check-circle ${styles.approve}`}></i>
          </div>}
      </div>
    </div>
  )
}

export default Lightbox
