import React from 'react'
import AlbumCard from './AlbumCard'
import styles from '../css/AlbumList.module.css'
import NoContent from './NoContent'

const AlbumList = ({ albums, reviews }) => {
  return (
    <>
      {albums.length ? <div className={`${styles.albumListWrapper} ${reviews ? styles.reviews : ''}`}>
        {!reviews && albums.map(album => <AlbumCard key={album.id} album={album} />)}
        {reviews && albums.map(album => <AlbumCard key={album.id} album={album} review={true} />)}
      </div> : <NoContent reviews={reviews}/>}
    </>
  )
}

export default AlbumList
