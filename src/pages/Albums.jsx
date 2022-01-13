import React, {useEffect} from 'react'
import AlbumList from '../components/AlbumList'
import CreateAlbum from '../components/CreateAlbum'
import useAlbums from '../hooks/useAlbums'
import styles from '../css/Albums.module.css'
import { useAuthContext } from '../contexts/AuthContext'
import { usePhotoContext } from '../contexts/PhotoContext'
import Loader from '../components/Loader'

const Albums = () => {
  const albums = useAlbums()
  const { currentUser } = useAuthContext()
  const { showReviews, setShowReviews } = usePhotoContext()

  // Renders indicator for number of new reviews (not yet viewed by the user)
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
    <>
      {albums.isLoading && <Loader />}
      <div className={styles.albumsWrapper}>
        <div className={styles.userInfo}>
          <h2>{currentUser.email}</h2>
          {albums.data &&
            <div className={styles.albumsStats}>
              <div className={styles.stat}>
                <p>{albums.data.length}</p>
                <p>{albums.data.length === 1 ? 'Album' : 'Albums'}</p>
              </div>
            </div>}
        </div>
        <div className={styles.myAlbumsWrapper}>
          {albums.data && <div className={styles.myAlbumsHeading}>
            <h2 className={!showReviews ? styles.selected : ''} onClick={() => setShowReviews(false)}>Albums <span>({albums.data.filter(album => album.original).length})</span></h2>
            <div className={styles.reviewsTabWrapper}>
              <h2 className={showReviews ? styles.selected : ''} onClick={() => setShowReviews(true)}>Reviews <span>({albums.data.filter(album => !album.original).length})</span></h2>
              {renderNewIndicator()}
            </div>
          </div>}
          <hr />
          {!showReviews
            ? <>
              <CreateAlbum />
              {albums.data && <AlbumList albums={albums.data.filter(album => album.original)} />}
            </>
            // Set reviews to true if reviews tab is selected
            : <>
              {albums.data && <AlbumList albums={albums.data.filter(album => !album.original)} reviews={true} />}
            </>}
        </div>
      </div>
    </>
  )
}

export default Albums
