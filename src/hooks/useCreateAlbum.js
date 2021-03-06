import { useState } from 'react'
import { collection, doc, addDoc, serverTimestamp, writeBatch, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const useCreateAlbum = () => {
  const { currentUser } = useAuthContext()
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // Function for adding album id to all selcted photos after review is sent in
  // Used after the new album is created below with "create"
  const addAlbumToPhotos = async (albumId, photos = []) => {
    if (!photos.length) return 

    const batch = writeBatch(db)

    photos.forEach(photo => {
      const photoRef = doc(db, 'photos', photo.id)
      batch.update(photoRef, { 'albums': arrayUnion(albumId)})
    })

    await batch.commit()
  } 

  // Create new album for the current user
  // Add album to array for selcted photos if photos is not an empty array
  const create = async (albumName, owner = null, original = true, photos = [], reviewedBy = null, thumbnail = null, comment = null) => {
    const collectionRef = collection(db, 'albums')
    setError(null)
    setIsError(false)
    setIsCreating(true)

    try {
      const newAlbum = await addDoc(collectionRef, {
        created: serverTimestamp(),
        name: albumName,
        owner: !owner ? currentUser.uid : owner,
        original,
        thumbnail,
        viewed: original ? true : false,
        reviewedBy,
        comment,
      })

      // Add album to all photos
      if (photos.length) {
        await addAlbumToPhotos(newAlbum.id, photos)
      }

    } catch (error) {
      setIsCreating(false)
      setIsError(true)
      setError(error.message)
    }
  }

  return {
    create,
    error,
    isError,
    isCreating,
  }
}

export default useCreateAlbum
