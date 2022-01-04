import React, { useCallback, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useDropzone } from 'react-dropzone'
import styles from '../css/UploadPhotos.module.css'


const UploadPhotos = () => {

  const onDrop = useCallback(acceptedFiles => {
    console.log('got files', acceptedFiles)
  })

  const { getRootProps, getInputProps, acceptedFiles, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'image/gif, image/jpeg, image/png, image/webp',
    onDrop
  })

  return (
    <div {...getRootProps()}
      className={`${styles.dropzoneWrapper} ${isDragAccept ? styles.dragAccept : ''} ${isDragReject ? styles.dragReject : ''}`}
    >
      <input {...getInputProps()} />

      {
        isDragActive
          ? (isDragAccept ? <p>Drop the photos!</p> : <p>One or more photos will not be uploaded</p>)
          : <p>Drop photos here to upload</p>
      }
      
    </div>
  )
}

export default UploadPhotos
