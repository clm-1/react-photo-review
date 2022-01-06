import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import UploadPhotos from '../components/UploadPhotos'
import useAlbum from '../hooks/useAlbum'
import useAlbumPhotos from '../hooks/useAlbumPhotos'

const OneAlbum = () => {
  const { albumId } = useParams()
  const album = useAlbum(albumId)
  const albumPhotos = useAlbumPhotos(albumId)
  
  useEffect(() => {
    console.log(albumId)
  }, [])

  useEffect(() => {
    console.log('photos: ', albumPhotos.data)
  }, [albumPhotos.data])

  return (
    <div>
      <h1>Album: {album.data && album.data.name}</h1>
      {album.data && <p>Review link: {`review-album/${album.data.owner}/${album.data.id}`}</p>}
      <UploadPhotos albumId={albumId} />
    </div>
  )
}

export default OneAlbum
