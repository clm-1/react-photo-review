import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import { usePhotoContext } from '../contexts/PhotoContext'
import useAlbum from '../hooks/useAlbum'
import useAlbumPhotos from '../hooks/useAlbumPhotos'
import useCreateAlbum from '../hooks/useCreateAlbum'

const ReviewAlbum = () => {
  const { ownerId, albumId } = useParams()
  const createAlbum = useCreateAlbum()
  const navigate = useNavigate()
  const album = useAlbum(albumId)
  const albumPhotos = useAlbumPhotos(albumId)

  useEffect(() => {
    console.log(albumPhotos.data)
  }, [albumPhotos.data])

  useEffect(() => {
    console.log(album.data)
    if (album.data && ownerId) {
      if (album.data.owner !== ownerId) return navigate('/')
      console.log('wrong owner id')
    }
  }, [album.data])

  const handleSendReview = () => {
    console.log('sent review')
    const date = Date.now()
    let name;
    if (!album.data.original) {
      name = album.data.name.substring(0, album.data.name.lastIndexOf('-'))
      console.log(`log: ${name}`)
    } else name = album.data.name

    createAlbum.create(`${name}-${date}`, album.data.owner, false, albumPhotos.data)
  }

  return (
    <div>
      <h1>Album: {album.data && album.data.name}</h1>
      <p>review album</p>
      <button onClick={handleSendReview}>send in review</button>
    </div>
  )
}

export default ReviewAlbum
