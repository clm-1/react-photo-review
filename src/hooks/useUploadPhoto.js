import { useState, useEffect, useRef } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const useUploadPhoto = (albumId) => {
  const { currentUser } = useAuthContext()
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(null)
  const isMounted = useRef(true)
  // Current image will be used to display which image is currently being uploaded
  const [currentPhoto, setCurrentPhoto] = useState(0)

  // This function is used in the upload-function below
  const uploadPhotos = async (image, transferredBytes, combinedSize) => {
    // Construct filename to save image as
    const fileName = `${Date.now()}-${image.name}`

    // Construct full path
    const fullPath = `photos/${currentUser.uid}/${fileName}`

    try {
      // Create storage ref
      const storageRef = ref(storage, fullPath)

      const uploadTask = uploadBytesResumable(storageRef, image)

      // Listen for state changes on the uploadTask
      uploadTask.on('state_changed', (uploadTaskSnapshot) => {
        setUploadProgress(Math.round(((transferredBytes + uploadTaskSnapshot.bytesTransferred) / combinedSize) * 100))
      })

      // Wait for upload to finish
      await uploadTask.then()

      // Get photo url
      const url = await getDownloadURL(storageRef)

      // Create doc for the photo
      const collectionRef = collection(db, 'photos')

      await addDoc(collectionRef, {
        created: serverTimestamp(),
        name: image.name,
        owner: currentUser.uid,
        path: storageRef.fullPath,
        size: image.size,
        type: image.type,
        albums: [albumId],
        url,
      })

      return uploadTask
    } catch (error) {
      setError('Photo failed to upload:', e.message)
      setIsError(true)
      setIsUploading(false)
    }
  }

  // Upload one or more images
  const upload = async (images) => {
    setIsUploading(true)
    setIsError(false)
    setIsSuccess(false)
    setError(null)

    if (!images) return

    // Keep track of the total size of all images + transferred bytes so far
    let combinedSize = 0
    let transferredBytes = 0

    // Calculate combined size for images
    images.forEach(image => {
      combinedSize += image.size
    })

    // Run uploadPhotos for each file in the array
    // Update current photo each time (to display which image is currently being uploaded)
    for (let i = 0; i < images.length; i++) {
      if (!isMounted.current) return
      await uploadPhotos(images[i], transferredBytes, combinedSize)
      transferredBytes += images[i].size
      if (isMounted.current) setCurrentPhoto(prev => prev + 1)
    }

    if (isMounted.current) {
      setIsUploading(false)
      setIsSuccess(true)
      setUploadProgress(null)
      setCurrentPhoto(0)
    }
  }

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    error,
    isError,
    isUploading,
    isSuccess,
    upload,
    uploadProgress,
    currentPhoto,
  }
}

export default useUploadPhoto
