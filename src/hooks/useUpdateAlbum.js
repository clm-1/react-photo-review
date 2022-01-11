import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const useUpdateAlbum = () => {
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Change name for album from Album page
  const rename = async (newName, albumId) => {
    setIsUpdating(true)

    try {
      const albumRef = doc(db, 'albums', albumId)
      await updateDoc(albumRef, { name: newName })
    } catch(error) {
      setError(error.message)
      setIsError(true)
    } finally {
      setIsUpdating(false)
    }
  }

  // Set thumbnail for album
  const setThumbnail = async (thumbnailPath, albumId) => {
    setIsUpdating(true)

    try {
      const albumRef = doc(db, 'albums', albumId)
      await updateDoc(albumRef, { thumbnail: thumbnailPath })
    } catch(error) {
      setIsError(true)
      setError(error.message)
    } finally {
      setIsUpdating(false)
    }
  }

  // Reviewed albums will have viewed: false as default
  // This sets viewed to true when user views it
  const setViewed = async (albumId) => {
    try {
      const albumRef = doc(db, 'albums', albumId)
      await updateDoc(albumRef, { viewed: true })
    } catch(error) {
      setIsError(true)
      setError(error.message)
    }
  }

  return {
    rename,
    setThumbnail,
    setViewed,
    error,
    isError,
    isUpdating
  }
}

export default useUpdateAlbum
