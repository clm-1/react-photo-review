import { useState } from 'react'
import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase'

const useDeletePhotos = () => {
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Delete album from photo, delete photo from storage if in no other albums
  const deleteOne = async (photo, albumId) => {
    setIsDeleting(true)
    setIsError(false)
    setError(null)

    try {
      // Check if photo is in more albums than the current one
      const photoInAlbums = photo.albums.filter(currAlbum => currAlbum !== albumId)
      if (!photoInAlbums.length) {
        // Delete photo from storage if photo is not in other album/s
        const storageRef = ref(storage, photo.path)
        await deleteObject(storageRef)
        const docRef = doc(db, 'photos', photo.id)
        await deleteDoc(docRef)
      } else {
        // Delete document from photo album-array
        const docRef = doc(db, 'photos', photo.id)
        updateDoc(docRef, { 'albums': arrayRemove(albumId) })
      }
    } catch (error) {
      setIsError(true)
      setError(error.message)
    }
  }


  return {
    deleteOne,
    isDeleting,
    error,
    isError
  }
}

export default useDeletePhotos
