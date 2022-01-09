import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/AlbumCard.module.css'
import { db } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { createDateTimeString } from '../helpers/time'
import noThumbnail from '../assets/images/no-thumbnail.png'

const AlbumCard = ({ album, review }) => {
  const navigate = useNavigate()

  const handleAlbumClick = () => {
    navigate(`/albums/${album.id}`)
  }

  // Delete album on click (will check in hook if photos also need to be deleted from storage)
  const handleDeleteClick = async (e) => {
    e.stopPropagation()
    const docRef = doc(db, 'albums', album.id)
    await deleteDoc(docRef)
  }

  return (
    <div className={styles.albumCardWrapper} onClick={handleAlbumClick}>
      <div className={styles.albumCardImgWrapper}>
        { !album.viewed && <div className={styles.newIndicator}></div>}
        <img src={album.thumbnail ? album.thumbnail : noThumbnail}></img>
      </div>
      <div className={styles.albumCardInfo}>
        <h3 onClick={handleDeleteClick} className={styles.title}>{album.name}</h3>
        { review && <p className={styles.reviewedBy}>By: Guybrush Threepwood</p>}
        <p>{createDateTimeString(album?.created)}</p>
      </div>
    </div>
  )
}

export default AlbumCard
