import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PhotoList from '../components/PhotoList'
import useAlbum from '../hooks/useAlbum'
import useAlbumPhotos from '../hooks/useAlbumPhotos'
import styles from '../css/Album.module.css'
import Lightbox from '../components/Lightbox'
import { usePhotoContext } from '../contexts/PhotoContext'
import useUpdateAlbum from '../hooks/useUpdateAlbum'
import noThumbnail from '../assets/images/no-thumbnail.png'
import useCreateAlbum from '../hooks/useCreateAlbum'
import { createDateTimeString } from '../helpers/time'

const Album = () => {
  const { albumId, ownerId } = useParams()
  const { photoToShow, setCurrentAlbum, notChosenPhotos, photoReviewError, setPhotoReviewError, chosenPhotos, setChosenPhotos, setNotChosenPhotos } = usePhotoContext()
  const reviewerNameRef = useRef()
  const album = useAlbum(albumId)
  const albumPhotos = useAlbumPhotos(albumId)
  const updateAlbum = useUpdateAlbum()
  const createAlbum = useCreateAlbum()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(album.data)
    if (album.data === null) return navigate('/')
    if (album.data && ownerId) {
      if (album.data.owner !== ownerId) return navigate('/')
    }
  }, [album.data])

  useEffect(() => {
    console.log(photoToShow)
  }, [photoToShow])

  useEffect(() => {
    console.log('photos: ', albumPhotos.data)
    if (albumPhotos.data) setCurrentAlbum([...albumPhotos.data])
    if (albumPhotos.data && albumPhotos.data.length && !album.thumbnail) {
      console.log('func', updateAlbum.setThumbnail)
      updateAlbum.setThumbnail(albumPhotos.data[albumPhotos.data.length - 1].url, album.data.id)
    }
  }, [albumPhotos.data])

  // Do checks and then create new album + add the new album to the chosen photos
  const handleSendReview = (e) => {
    e.preventDefault()

    if (!chosenPhotos || !chosenPhotos.length) return setPhotoReviewError('No photos chosen')
    if ((chosenPhotos.length + notChosenPhotos.length) !== albumPhotos.data.length) {
      return setPhotoReviewError('You need to make a choice for each photo')
    }

    const date = Date.now()
    let name;
    if (!album.data.original) {
      name = album.data.name.substring(0, album.data.name.lastIndexOf('-'))
      console.log(`log: ${name}`)
    } else name = album.data.name

    createAlbum.create(`${name}`, album.data.owner, false, chosenPhotos, reviewerNameRef.current.value, album.data.thumbnail)
    setChosenPhotos([])
    setNotChosenPhotos([])
  }

  return (
    <>
      {album.data && albumPhotos.data &&
        <div className={styles.albumPageWrapper}>
          <div className={styles.albumWrapper}>
            <div className={styles.reviewAlbumHeader}>
              <div className={styles.albumInfo}>
                <div>
                  <h1>{album.data.name}</h1>
                  <h2>{createDateTimeString(album.data.created)}</h2>
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
            {albumPhotos.data && <PhotoList photos={albumPhotos.data} albumId={albumId} review={true}/>}
            {photoToShow && <Lightbox photo={albumPhotos.data[photoToShow.current]} review={true} />}
          </div>
          <div className={styles.sendReviewWrapper}>
            <div className={styles.photoReviewStats}>
              {/* <p>{photoReviewError && photoReviewError}</p> */}
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
              <div className={`${styles.reviewStatsMsg} ${albumPhotos.data.length !== (notChosenPhotos.length + chosenPhotos.length) ? styles.notFinished : styles.finished}`}>
                {albumPhotos.data.length !== (notChosenPhotos.length + chosenPhotos.length) ? <p>You need to approve or reject every photo before sending your review</p> : <p>All set to send in review!</p>}
              </div>
            </div>
            <div className={styles.photoReviewForm}>
              <form onSubmit={handleSendReview}>
                <label htmlFor="client-name" required>Your name</label>
                <input type="text" name="client-name" ref={reviewerNameRef} />
                <label htmlFor="comment">Comment (optional)</label>
                <textarea type="text" name="comment" />
                <button type="submit" className={styles.sendReviewBtn}>Send review</button>
              </form>
            </div>
          </div>
        </div>}
    </>
  )
}

export default Album
