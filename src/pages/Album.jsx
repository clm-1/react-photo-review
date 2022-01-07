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
import useDeleteAlbum from '../hooks/useDeleteAlbum'

const Album = () => {
  const { photoToShow, setCurrentAlbum } = usePhotoContext()
  const { albumId } = useParams()
  const { currentUser } = useAuthContext()
  const album = useAlbum(albumId)
  const albumPhotos = useAlbumPhotos(albumId)
  const { deleteAlbum } = useDeleteAlbum(album.data, albumPhotos.data)
  
  useEffect(() => {
    console.log(photoToShow)
  }, [photoToShow])

  useEffect(() => {
    console.log('photos: ', albumPhotos.data)
    if (albumPhotos.data) setCurrentAlbum([...albumPhotos.data])
  }, [albumPhotos.data])

  const handleDeleteAlbum = () => {
    console.log('delete this: ', album.data)
    deleteAlbum()
  }

  return (
    <div className={styles.albumWrapper}>
      <h1>Album: {album.data && album.data.name}</h1>
      {album.data && <p>Review link: {`http://localhost:3000/review-album/${album.data.owner}/${album.data.id}`}</p>}
      <button onClick={handleDeleteAlbum} className={styles.deleteAlbum}><i className="fas fa-trash-alt"></i></button>
      <UploadPhotos albumId={albumId} />
      { albumPhotos.data && <PhotoList photos={albumPhotos.data} albumId={albumId} />}
      { photoToShow && <Lightbox photo={albumPhotos.data[photoToShow.current]} /> }
    </div>
  )
}

export default Album
