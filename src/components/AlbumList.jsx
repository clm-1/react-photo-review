import React from 'react'
import AlbumCard from './AlbumCard'
import styles from '../css/AlbumList.module.css'
import NoContent from './NoContent'

const AlbumList = ({ albums, reviews }) => {
  return (
    <>
      {albums.length ? <div className={`${styles.albumListWrapper} ${reviews ? styles.reviews : ''}`}>
        {/* Render out album list with reviewer name if reviews is true */}
        {albums.map(album => <AlbumCard key={album.id} album={album} review={reviews}/>)}
      </div> : <NoContent reviews={reviews}/>}
    </>
  )
}

export default AlbumList
