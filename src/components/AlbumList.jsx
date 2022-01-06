import React from 'react'
import { useNavigate } from 'react-router-dom'
import AlbumCard from './AlbumCard'
import styles from '../css/AlbumList.module.css'

const AlbumList = ({ albums }) => {

  return (
    <div className={styles.albumListWrapper}>
      { albums.map(album => <AlbumCard key={album.id} album={album}/>)}
    </div>
  )
}

export default AlbumList
