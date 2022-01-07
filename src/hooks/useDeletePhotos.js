import React, { useState } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase'

const useDeletePhotos = () => {
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Delete album from photo, delete photo from storage if in no other albums
  const deleteOne = () => {
    setIsDeleting(true)

    try {

    } catch(error) {

    } finally {

    }
  }


  return {

  }
}

export default useDeletePhotos
