import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PhotoList from '../components/PhotoList'
import useAlbum from '../hooks/useAlbum'
import useAlbumPhotos from '../hooks/useAlbumPhotos'
import Lightbox from '../components/Lightbox'
import { usePhotoContext } from '../contexts/PhotoContext'
import useUpdateAlbum from '../hooks/useUpdateAlbum'
import useCreateAlbum from '../hooks/useCreateAlbum'
import { createDateTimeString } from '../helpers/time'
import SentReviewModal from '../components/SentReviewModal'
import Loader from '../components/Loader'
import styles from '../css/Album.module.css'

const Album = () => {
  const { albumId, ownerId } = useParams()
  const { photoToShow, setCurrentAlbum, notChosenPhotos, chosenPhotos, setChosenPhotos, setNotChosenPhotos, currentAlbum } = usePhotoContext()
  const [error, setError] = useState(null)
  const [showSentModal, setShowSentModal] = useState(false)
  const sentReview = useRef(false)
  const reviewerNameRef = useRef()
  const commentRef = useRef()
  const album = useAlbum(albumId)
  const albumPhotos = useAlbumPhotos(albumId)
  const updateAlbum = useUpdateAlbum()
  const createAlbum = useCreateAlbum()
  const navigate = useNavigate()
  const albumLength = useRef()

  // Set local storage function
  // Used when chosenPhotos or notChosenPhotos changes (useEffect)
  const setLocalStorage = () => {
    if (!album.data) return
    const storageObj = {
      reviewSent: sentReview.current,
      chosenPhotos,
      notChosenPhotos
    }
    localStorage.setItem(albumId, JSON.stringify(storageObj))
  }

  // Get local storage data (used on component mount)
  const getLocalStorage = () => {
    const storageObj = JSON.parse(localStorage.getItem(albumId))
    if (storageObj) {
      setChosenPhotos([...storageObj.chosenPhotos])
      setNotChosenPhotos([...storageObj.notChosenPhotos])

      if (storageObj.reviewSent) {
        sentReview.current = true
      }
    }
  }

  // Check if all photos have been either approved or rejected, used for message and when sending in review
  const checkPhotoChoice = () => (albumPhotos.data.length !== (notChosenPhotos.length + chosenPhotos.length))

  // Get data from local storage
  useEffect(() => {
    getLocalStorage()
  }, [])

  // Check if there is album data
  // Check if ownerId from params matches the owner in the fetched album
  // If checks fail, return to home
  useEffect(() => {
    if (album.data === null) return navigate('/')
    if (album.data && ownerId) {
      if (album.data.owner !== ownerId) return navigate('/')
    }
  }, [album.data])

  // Set local storage when data changes
  useEffect(() => {
    setLocalStorage()
  }, [chosenPhotos, notChosenPhotos])

  // If image is deleted by owner while chosen/not chosen by reviewer, remove photo from the array
  const checkDeletedImage = (array, setArray) => {
    if (!albumPhotos.data) return
    array.forEach((photo, i) => {
      const found = albumPhotos.data.find(albumPhoto => albumPhoto.id === photo.id)
      if (!found) setArray(prev => prev.filter(currPhoto => currPhoto.id !== photo.id))
    })
  }

  useEffect(() => {
    // Check if an image was removed
    checkDeletedImage(chosenPhotos, setChosenPhotos)
    checkDeletedImage(notChosenPhotos, setNotChosenPhotos)
    if (albumPhotos.data) setCurrentAlbum([...albumPhotos.data])
  }, [albumPhotos.data])

  // Do checks and then create new album + add the new album to the chosen photos
  const handleSendReview = (e) => {
    e.preventDefault()

    if (!reviewerNameRef.current.value) return;
    if (!chosenPhotos || !chosenPhotos.length) return setError('No photos chosen')
    if (checkPhotoChoice()) {
      return setError('You have not yet approved or rejected every photo')
    }

    // Create new album with all the data from the review (including reviewer name and comment)
    createAlbum.create(`${album.data.name}`, album.data.owner, false, chosenPhotos, reviewerNameRef.current.value, chosenPhotos[chosenPhotos.length - 1].url, commentRef.current.value)
    sentReview.current = true;
    setError(null)
    setLocalStorage(true)
    setShowSentModal(true)
  }

  return (
    <>
      {(album.isLoading || albumPhotos.isLoading) && <Loader />}
      {showSentModal && <SentReviewModal setShowSentModal={setShowSentModal} />}
      {album.data && albumPhotos.data &&
        <div className={styles.albumPageWrapper}>
          {sentReview.current && <div className={styles.reviewedAlbumMsg}>
            <p>You have sent a review for this album</p>
          </div>}
          <div className={styles.albumWrapper}>
            <div className={styles.reviewAlbumHeader}>
              <div className={styles.albumInfo}>
                <div className={styles.albumTitle}>
                  <h1>{album.data.name}</h1>
                  <p>{createDateTimeString(album.data.created)}</p>
                </div>
                {albumPhotos.data && <div className={styles.albumStats}>
                  <div className={styles.stat}>
                    <p>{albumPhotos.data.length}</p>
                    <p>{albumPhotos.data.length === 1 ? 'Photo' : 'Photos'}</p>
                  </div>
                </div>}
              </div>
            </div>
            <hr />
            {albumPhotos.data && <PhotoList sentReview={sentReview.current} photos={albumPhotos.data} albumId={albumId} review={true} />}
            {photoToShow && <Lightbox photo={albumPhotos.data[photoToShow.current]} review={true} reviewSent={sentReview.current} />}
          </div>
          <div className={`${styles.sendReviewWrapper} ${sentReview.current ? styles.reviewSent : ''}`}>
            <div className={styles.photoReviewStats}>
              <p>Summary</p>
              <hr />
              <div className={styles.summaryItem}>
                <p>Undecided:</p>
                <p>{albumPhotos.data.length - (notChosenPhotos.length + chosenPhotos.length)}</p>
              </div>
              <div className={styles.summaryItem}>
                <p>Rejected:</p>
                <p>{notChosenPhotos.length}</p>
              </div>
              <div className={`${styles.summaryItem} ${styles.lastItem}`}>
                <p>Approved:</p>
                <p>{chosenPhotos.length}</p>
              </div>
              <div className={`${styles.reviewStatsMsg} ${checkPhotoChoice() ? styles.notFinished : styles.finished}`}>
                {checkPhotoChoice() ? <p>You need to approve or reject every photo before sending your review</p> : <p>All set to send in review!</p>}
              </div>
            </div>
            <div className={styles.photoReviewForm}>
              <form onSubmit={handleSendReview}>
                <label htmlFor="client-name">Your name</label>
                <input type="text" required name="client-name" ref={reviewerNameRef} />
                <label htmlFor="comment">Comment (optional)</label>
                <textarea ref={commentRef} type="text" name="comment" />
                {error &&
                  <div className={styles.errorWrapper}>
                    <p>{error}</p>
                  </div>}
                <button type="submit" className={styles.sendReviewBtn}>Send review</button>
              </form>
            </div>
          </div>
        </div>}
    </>
  )
}

export default Album
