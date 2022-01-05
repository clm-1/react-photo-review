import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import useCreateAlbum from '../hooks/useCreateAlbum'
import useGetOneAlbum from '../hooks/useGetOneAlbum'

const OneAlbum = () => {
  const { albumId } = useParams()
  const album = useGetOneAlbum(albumId)
  const createAlbum = useCreateAlbum()
  
  useEffect(() => {
    console.log(albumId)
  }, [])

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
      {album.data && <p>Review link: {`review-album/${album.data.owner}/${album.data.id}`}</p>}
      <p>review album</p>
      <button onClick={handleSendReview}>send in review</button>
    </div>
  )
}

export default OneAlbum
