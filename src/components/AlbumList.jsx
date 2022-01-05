import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumList = ({ albums }) => {
  const navigate = useNavigate()

  const handleAlbumClick = (albumId) => {
    console.log('album:', albumId)
    navigate(`/albums/${albumId}`)
  }

  return (
    <div>
      { albums.map(album => <div onClick={() => handleAlbumClick(album.id)} key={album.id}>{album.name}</div>)}
    </div>
  )
}

export default AlbumList
