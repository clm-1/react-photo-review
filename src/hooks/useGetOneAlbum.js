import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const useGetOneAlbum = (albumId) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const getAlbum = async () => {
    try {
      const docRef = doc(db, 'albums', albumId)
      const album = await getDoc(docRef)
      console.log(album.data())
      console.log('album: ', album)
      const albumData = {
        ...album.data(),
        id: album.id
      }
      console.log('albumData', albumData)
      setData(albumData)
    } catch (error) {
      console.log('error', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAlbum()
  }, [])
  
  return {
    data,
    loading,
  }
}

export default useGetOneAlbum
