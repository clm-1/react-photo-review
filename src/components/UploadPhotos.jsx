import React, { useCallback, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useDropzone } from 'react-dropzone'
import styles from '../css/UploadPhotos.module.css'
import useUploadPhoto from '../hooks/useUploadPhoto'
import { collectionGroup, doc, collection, getDocs, query, where, updateDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'



const UploadPhotos = ({ albumId }) => {
  const uploadPhotos = useUploadPhoto(albumId)

  const queryTest = async () => {
    console.log('test')
    const photoRef = collection(db, 'photos')
    const queryRef = query(photoRef, where(`photos.123.name`, '==', "name.png"))
    const snapshot = await getDocs(queryRef)

    const data = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })

    console.log(data)
  }

  const secondQueryTest = async () => {
    console.log('test')
    const photoRef = collection(db, 'photos')
    const queryRef = query(collectionGroup(db, 'photosInAlbum'), where('name', '==', 'name2.png'))
    const snapshot = await getDocs(queryRef)

    const data = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })

    console.log(data)
  }

  const queryTestDeleteField = async () => {
    const photoRef = doc(db, 'photos', 'SnEw8mKf7cmdMAiI87jc')

    const num = '651'

    const res = await updateDoc(photoRef, {
      [`photos.${num}`]: deleteField()
    })
    console.log('res', res)
  }

  const onDrop = useCallback(acceptedFiles => {
    console.log('got files', acceptedFiles)

    if (!acceptedFiles.length) return

    uploadPhotos.upload(acceptedFiles)
  })

  const { getRootProps, getInputProps, acceptedFiles, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'image/gif, image/jpeg, image/png, image/webp',
    onDrop
  })

  return (
    <>
      <div {...getRootProps()}
        className={`${styles.dropzoneWrapper} ${isDragAccept ? styles.dragAccept : ''} ${isDragReject ? styles.dragReject : ''}`}
      >
        <input {...getInputProps()} />

          {
          isDragActive
            ? (isDragAccept ? <p>Drop the photos!</p> : <p>One or more photos will not be uploaded</p>)
            : <p>Add photos to this album</p>
          }

        {uploadPhotos.uploadProgress !== null && <ProgressBar variant="success" animated label={`${uploadPhotos.currentPhoto + 1}/${acceptedFiles.length}`} now={uploadPhotos.uploadProgress} />}

      </div>
    </>
  )
}

export default UploadPhotos
