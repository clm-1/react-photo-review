import React, { useEffect, useState } from 'react'
import AlbumList from '../components/AlbumList'
import CreateAlbum from '../components/CreateAlbum'
import UploadPhotos from '../components/UploadPhotos'
import useAlbums from '../hooks/useAlbums'
import styles from '../css/Albums.module.css'
import { useAuthContext } from '../contexts/AuthContext'
import { usePhotoContext } from '../contexts/PhotoContext'

const Albums = () => {
  const albums = useAlbums()
  const { currentUser } = useAuthContext()
  const { showReviews, setShowReviews } = usePhotoContext()

  useEffect(() => {
    console.log(albums.data)
  }, [albums.data])

  const renderNewIndicator = () => {
    const num = albums.data.filter(album => !album.viewed).length
    if (num < 1) return
    
    return (
      <div className={styles.newIndicator}>
        <span>{num < 100 ? num : '99+'}</span>
      </div>
    )
  }

  return (
    <div className={styles.albumsWrapper}>
      <div className={styles.userInfo}>
        <h1>{currentUser.email}</h1>
        {albums.data &&
          <div className={styles.albumsStats}>
            <div className={styles.stat}>
              <p>{albums.data.filter(album => album.original).length}</p>
              <p>Albums</p>
            </div>
            <div className={styles.stat}>
              <p>{albums.data.filter(album => !album.original).length}</p>
              <p>Reviews</p>
            </div>
          </div>}
      </div>
      <div className={styles.myAlbumsWrapper}>
        {albums.data && <div className={styles.myAlbumsHeading}>
          <h2 className={!showReviews ? styles.selected : ''} onClick={() => setShowReviews(false)}>Albums</h2>
          <div className={styles.reviewsTabWrapper}>
            <h2 className={showReviews ? styles.selected : ''} onClick={() => setShowReviews(true)}>Reviews</h2>
            {renderNewIndicator()}
          </div>
        </div>}
        <hr />
        {!showReviews
          ? <div>
            <CreateAlbum />
            {albums.data && <AlbumList albums={albums.data.filter(album => album.original)} />}
          </div>
          : <div>
            {albums.data && <AlbumList albums={albums.data.filter(album => !album.original)} reviews={true} />}
          </div>}
      </div>
    </div>
  )
}

export default Albums
