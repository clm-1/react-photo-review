import React, { useEffect } from 'react'
import AlbumList from '../components/AlbumList'
import CreateAlbum from '../components/CreateAlbum'
import UploadPhotos from '../components/UploadPhotos'
import useAlbums from '../hooks/useAlbums'
import styles from '../css/Albums.module.css'

const Albums = () => {
  const albums = useAlbums()

  useEffect(() => {
    console.log(albums.data)
  }, [albums.data])

  return (
    <div className={styles.albumsWrapper}>
      <CreateAlbum />
      { albums.data && <AlbumList albums={albums.data} />}
    </div>
  )
}

export default Albums
