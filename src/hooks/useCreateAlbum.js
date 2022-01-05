import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const useCreateAlbum = () => {
  const { currentUser } = useAuthContext()
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const create = async (albumName, owner = null, original = true) => {
    const collectionRef = collection(db, 'albums')
    setError(null)
    setIsError(false)
    setIsCreating(true)
    setIsSuccess(false)

    try {
      await addDoc(collectionRef, {
        created: serverTimestamp(),
        name: albumName,
        owner: !owner ? currentUser.uid : owner,
        original,
      })
      setIsSuccess(true)
    } catch (error) {
      setIsError(true)
      setError(error.message)
      console.log(error.message)
    } finally {
      setIsCreating(false)
    }
  }

  return {
    create,
  }
}

export default useCreateAlbum
