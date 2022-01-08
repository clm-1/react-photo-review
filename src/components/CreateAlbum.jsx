import React, { useRef } from 'react'
import useCreateAlbum from '../hooks/useCreateAlbum'
import styles from "../css/CreateAlbum.module.css"

const CreateAlbum = () => {
  const createAlbum = useCreateAlbum()
  const albumNameInputRef = useRef()

  const handleCreateAlbum = (e) => {
    e.preventDefault()
    if (!albumNameInputRef.current.value) return
    createAlbum.create(albumNameInputRef.current.value)
    albumNameInputRef.current.value = ''
  }

  return (
    <div className={styles.createAlbumWrapper}>
      <form onSubmit={handleCreateAlbum}>
        <div className={styles.inputWrapper}>
          <input type="text" name="album-name" ref={albumNameInputRef} placeholder="Add new album" required />
          <button type="submit">+</button>
        </div>
      </form>
    </div>
  )
}

export default CreateAlbum
