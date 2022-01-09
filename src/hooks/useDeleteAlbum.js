import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, deleteDoc, writeBatch, arrayRemove } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase'

const useDeleteAlbum = (album, photos) => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteAlbum = async () => {
    setIsDeleting(true)

    // Remove current album from all photos
    const removeCurrentAlbumFromPhotos = photos.map(photo => {
      return { ...photo, albums: photo.albums.filter(albumId => albumId !== album.id) }
    })

    // Separate photos to make two batches (photos to keep and photos to delete from storage)
    const separatedPhotos = [removeCurrentAlbumFromPhotos.filter(photo => photo.albums.length), removeCurrentAlbumFromPhotos.filter(photo => !photo.albums.length)]

    try {
      // Delete all images that are not in any other albums first
      if (separatedPhotos[1].length) {
        console.log('gonna delete from storage')
        for(let i = 0; i < separatedPhotos[1].length; i++) {
          console.log('deleting photo')
          const storageRef = ref(storage, photos[i].path)
          await deleteObject(storageRef)
        }

        // Remove docs for deleted files
        const removePhotoDocsBatch = writeBatch(db)

        separatedPhotos[1].forEach(photo => {
          const photoRef = doc(db, 'photos', photo.id)
          removePhotoDocsBatch.delete(photoRef)
        })

        await removePhotoDocsBatch.commit()
      }

      // Only emove album from albums-array for the other photos
      if (separatedPhotos[0].length) {
        const removeAlbumFromArrayBatch = writeBatch(db)

        separatedPhotos[0].forEach(photo => {
          const photoRef = doc(db, 'photos', photo.id)
          removeAlbumFromArrayBatch.update(photoRef, { 'albums': arrayRemove(album.id)})
        })

        removeAlbumFromArrayBatch.commit()
      }

      // Finally delete the album doc
      const albumDocRef = doc(db, 'albums', album.id)
      await deleteDoc(albumDocRef)
      setIsDeleting(false)
      navigate('/albums', { replace: true })
    } catch (error) {
      console.log(error.message)
      setIsDeleting(false)
      setIsError(true)
      setError(error.message)
    }
  }

  return {
    deleteAlbum
  }
}

export default useDeleteAlbum
