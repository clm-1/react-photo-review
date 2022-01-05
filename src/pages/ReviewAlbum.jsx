import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import useCreateAlbum from '../hooks/useCreateAlbum'
import useGetOneAlbum from '../hooks/useGetOneAlbum'

const ReviewAlbum = () => {
  const { ownerId, albumId } = useParams()
  const createAlbum = useCreateAlbum()
  const navigate = useNavigate()
  const album = useGetOneAlbum(albumId)

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

    createAlbum.create(`${name}-${date}`, album.data.owner, false)
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
