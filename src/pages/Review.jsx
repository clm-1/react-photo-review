import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import PhotoList from '../components/PhotoList'
import UploadPhotos from '../components/UploadPhotos'
import { useAuthContext } from '../contexts/AuthContext'
import useAlbum from '../hooks/useAlbum'
import useAlbumPhotos from '../hooks/useAlbumPhotos'
import styles from '../css/Album.module.css'
import Lightbox from '../components/Lightbox'
import { usePhotoContext } from '../contexts/PhotoContext'
import useCreateAlbum from '../hooks/useCreateAlbum'

const Review = () => {
  const { photoToShow, setCurrentAlbum } = usePhotoContext()
  const { ownerId, albumId } = useParams()
  const createAlbum = useCreateAlbum()
  const { currentUser } = useAuthContext()
  const { chosenPhotos } = usePhotoContext()
  const album = useAlbum(albumId)
  const albumPhotos = useAlbumPhotos(albumId)
  
  useEffect(() => {
    console.log(photoToShow)
  }, [photoToShow])

  useEffect(() => {
    console.log(album.data)
    if (album.data && ownerId) {
      if (album.data.owner !== ownerId) return navigate('/')
    }
  }, [album.data])

  useEffect(() => {
    console.log('photos: ', albumPhotos.data)
    if (albumPhotos.data) setCurrentAlbum([...albumPhotos.data])
  }, [albumPhotos.data])

  const handleSendReview = () => {
    console.log('sent review')
    if (!chosenPhotos || !chosenPhotos.length) return console.log('no photos chosen')
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
      { photoToShow && <Lightbox photo={albumPhotos.data[photoToShow.current]} /> }
    </div>
  )
}

export default Review