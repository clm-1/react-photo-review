import React, { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const useUpdateAlbum = () => {
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const rename = async (newName, albumId) => {
    setIsUpdating(true)

    try {
      console.log('albumId', albumId)
      const albumRef = doc(db, 'albums', albumId)
      await updateDoc(albumRef, { name: newName })
    } catch(error) {
      console.log(error.message)
    } finally {
      setIsUpdating(false)
    }
  }

  const setThumbnail = async (thumbnailPath, albumId) => {
    setIsUpdating(true)

    try {
      console.log('albumId', albumId)
      const albumRef = doc(db, 'albums', albumId)
      await updateDoc(albumRef, { thumbnail: thumbnailPath })
    } catch(error) {
      console.log(error.message)
    } finally {
      setIsUpdating(false)
    }
  }

  const setViewed = async (albumId) => {
    try {
      const albumRef = doc(db, 'albums', albumId)
      await updateDoc(albumRef, { viewed: true })
    } catch(error) {
      console.log(error.message)
    }
  }

  return {
    rename,
    setThumbnail,
    setViewed
  }
}

export default useUpdateAlbum
