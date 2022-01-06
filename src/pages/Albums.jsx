import React, { useEffect } from 'react'
import AlbumList from '../components/AlbumList'
import CreateAlbum from '../components/CreateAlbum'
import UploadPhotos from '../components/UploadPhotos'
import useAlbums from '../hooks/useAlbums'
import styles from '../css/Albums.module.css'
import { useAuthContext } from '../contexts/AuthContext'

const Albums = () => {
  const albums = useAlbums()
  const { currentUser } = useAuthContext()

  useEffect(() => {
    console.log(albums.data)
  }, [albums.data])

  return (
    <div className={styles.albumsWrapper}>
      <h1>{currentUser.email}</h1>
      <CreateAlbum />
      <div className={styles.myAlbumsHeading}>
        <h2>My albums</h2>
        <h2>Reviews</h2>
      </div>
      { albums.data && <AlbumList albums={albums.data} />}
    </div>
  )
}

export default Albums
