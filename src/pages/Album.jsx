import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import PhotoList from '../components/PhotoList'
import UploadPhotos from '../components/UploadPhotos'
import { useAuthContext } from '../contexts/AuthContext'
import useAlbum from '../hooks/useAlbum'
import useAlbumPhotos from '../hooks/useAlbumPhotos'
import styles from '../css/Album.module.css'

const Album = () => {
  const { albumId } = useParams()
  const { currentUser } = useAuthContext()
  const album = useAlbum(albumId)
  const albumPhotos = useAlbumPhotos(albumId)
  
  useEffect(() => {
   
  }, [album.data])

  useEffect(() => {
    console.log('photos: ', albumPhotos.data)
  }, [albumPhotos.data])

  return (
    <div className={styles.albumWrapper}>
      <h1>Album: {album.data && album.data.name}</h1>
      {album.data && <p>Review link: {`review-album/${album.data.owner}/${album.data.id}`}</p>}
      <UploadPhotos albumId={albumId} />
      { albumPhotos.data && <PhotoList photos={albumPhotos.data} />}
    </div>
  )
}

export default Album
