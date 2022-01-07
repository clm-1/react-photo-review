import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import PhotoList from '../components/PhotoList'
import { useNavigate } from 'react-router-dom'
import useAlbum from '../hooks/useAlbum'
import useAlbumPhotos from '../hooks/useAlbumPhotos'
import styles from '../css/Album.module.css'
import Lightbox from '../components/Lightbox'
import { usePhotoContext } from '../contexts/PhotoContext'
import useCreateAlbum from '../hooks/useCreateAlbum'

const Review = () => {
  const { photoToShow, setCurrentAlbum, notChosenPhotos, photoReviewError, setPhotoReviewError } = usePhotoContext()
  const { ownerId, albumId } = useParams()
  const navigate = useNavigate()
  const createAlbum = useCreateAlbum()
  const { chosenPhotos } = usePhotoContext()
  const album = useAlbum(albumId)
  const albumPhotos = useAlbumPhotos(albumId)

  // Check if the fetched album's owner matches the params ownerId
  useEffect(() => {
    console.log(album.data)
    if (album.data === null) return navigate('/')
    if (album.data && ownerId) {
      if (album.data.owner !== ownerId) return navigate('/')
    }
  }, [album.data])

  useEffect(() => {
    console.log('error: ', photoReviewError)
  }, [photoReviewError])

  // Set current album photos in context, data is used by Lightbox and PhotoCard
  useEffect(() => {
    if (albumPhotos.data) setCurrentAlbum([...albumPhotos.data])
  }, [albumPhotos.data])

  // Do checks and then create new album + add the new album to the chosen photos
  const handleSendReview = () => {
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

    createAlbum.create(`${name}-${date}`, album.data.owner, false, chosenPhotos)
  }

  return (
    <div className={styles.albumWrapper}>
      <h1>Album: {album.data && album.data.name}</h1>
      <button onClick={handleSendReview}>Send review</button>
      { albumPhotos.data && <PhotoList photos={albumPhotos.data} />}
      { photoToShow && <Lightbox photo={albumPhotos.data[photoToShow.current]} review={true} /> }
      <p>{photoReviewError && photoReviewError}</p>
      <p>Photos in album: {albumPhotos.data && albumPhotos.data.length}</p>
      <p>Chosen photos: {chosenPhotos.length}</p>
      <p>Not chosen photos: {notChosenPhotos.length}</p>
    </div>
  )
}

export default Review