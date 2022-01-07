import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/AlbumCard.module.css'
import { db } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { createDateTimeString } from '../helpers/time'

const AlbumCard = ({ album }) => {
  const navigate = useNavigate()

  console.log(album)

  const handleAlbumClick = () => {
    console.log('album:', album.id)
    navigate(`/albums/${album.id}`)
  }

  const handleDeleteClick = async (e) => {
    e.stopPropagation()
    const docRef = doc(db, 'albums', album.id)
    await deleteDoc(docRef)
  }

  return (
    <div className={styles.albumCardWrapper} onClick={handleAlbumClick}>
      <div className={styles.albumCardImgWrapper}>
        <img src={album.thumbnail}></img>
      </div>
      <div className={styles.albumCardInfo}>
        <h3 onClick={handleDeleteClick} className={styles.title}>{album.name}</h3>
        <p>{createDateTimeString(album?.created)}</p>
      </div>
    </div>
  )
}

export default AlbumCard
