import React from 'react'
import { useNavigate } from 'react-router-dom'
import AlbumCard from './AlbumCard'
import styles from '../css/AlbumList.module.css'
import ReviewCard from './ReviewCard'

const AlbumList = ({ albums, reviews }) => {

  return (
    <div className={`${styles.albumListWrapper} ${reviews ? styles.reviews : ''}`}>
      { !reviews && albums.map(album => <AlbumCard key={album.id} album={album}/>)}
      { reviews && albums.map(album => <AlbumCard key={album.id} album={album} review={true}/>)}
    </div>
  )
}

export default AlbumList
