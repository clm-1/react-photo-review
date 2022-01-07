import React, { useState } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
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
      const photoInAblums = photo.albums.filter(currAlbum => currAlbum !== albumId)
      if (!photoInAblums.length) {
        // Delete photo from storage if photo is not in other album/s
        console.log('deleting from storage')
        const storageRef = ref(storage, photo.path)
        await deleteObject(storageRef)
      }

      // Delete document from photos-collection
      const docRef = doc(db, 'photos', photo.id)
      await deleteDoc(docRef)
    } catch (error) {
      console.log(error.message)
      setIsError(true)
      setError(error.message)
    }
  }


  return {
    deleteOne,
  }
}

export default useDeletePhotos
