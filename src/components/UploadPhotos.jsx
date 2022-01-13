import React, { useCallback } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useDropzone } from 'react-dropzone'
import styles from '../css/UploadPhotos.module.css'
import useUploadPhoto from '../hooks/useUploadPhoto'

// Dropzone on album page, can upload one or more images
const UploadPhotos = ({ albumId }) => {
  const uploadPhotos = useUploadPhoto(albumId)

  const onDrop = useCallback(acceptedFiles => {
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
        className={`${styles.dropzoneWrapper} ${uploadPhotos.isUploading ? styles.isUploading : ''} ${isDragAccept ? styles.dragAccept : ''} ${isDragReject ? styles.dragReject : ''}`}
      >
        <input {...getInputProps()} />

          {
          isDragActive
            ? (isDragAccept ? <p>Drop files</p> : <p>One or more files will not be uploaded</p>)
            : <p>Drop image files here</p>
          }

        {uploadPhotos.uploadProgress !== null && <ProgressBar variant="success" animated label={`${uploadPhotos.currentPhoto + 1}/${acceptedFiles.length}`} now={uploadPhotos.uploadProgress} />}

      </div>
    </>
  )
}

export default UploadPhotos
