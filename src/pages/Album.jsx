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

const Album = () => {
  const { photoToShow, setCurrentAlbum } = usePhotoContext()
  const { albumId } = useParams()
  const { currentUser } = useAuthContext()
  const album = useAlbum(albumId)
  const albumPhotos = useAlbumPhotos(albumId)
  
  useEffect(() => {
    console.log(photoToShow)
  }, [photoToShow])

  useEffect(() => {
    console.log('photos: ', albumPhotos.data)
    if (albumPhotos.data) setCurrentAlbum([...albumPhotos.data])
  }, [albumPhotos.data])

  return (
    <div className={styles.albumWrapper}>
      <h1>Album: {album.data && album.data.name}</h1>
      {album.data && <p>Review link: {`review-album/${album.data.owner}/${album.data.id}`}</p>}
      <UploadPhotos albumId={albumId} />
      { albumPhotos.data && <PhotoList photos={albumPhotos.data} />}
      { photoToShow && <Lightbox photo={albumPhotos.data[photoToShow.current]} /> }
    </div>
  )
}

export default Album
