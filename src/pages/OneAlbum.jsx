import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import useCreateAlbum from '../hooks/useCreateAlbum'
import useGetOneAlbum from '../hooks/useGetOneAlbum'

const OneAlbum = () => {
  const { albumId } = useParams()
  const album = useGetOneAlbum(albumId)
  
  useEffect(() => {
    console.log(albumId)
  }, [])

  return (
    <div>
      <h1>Album: {album.data && album.data.name}</h1>
      {album.data && <p>Review link: {`review-album/${album.data.owner}/${album.data.id}`}</p>}
      <p>review album</p>
    </div>
  )
}

export default OneAlbum
