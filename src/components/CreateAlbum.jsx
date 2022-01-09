import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateAlbum from '../hooks/useCreateAlbum'
import styles from "../css/CreateAlbum.module.css"
import { usePhotoContext } from '../contexts/PhotoContext'

const CreateAlbum = ({ fromAlbum, photoList }) => {
  const createAlbum = useCreateAlbum()
  const navigate = useNavigate()
  const albumNameInputRef = useRef()
  const {chosenPhotos, setChosenPhotos} = usePhotoContext()

  // Create album, send in different data depending on if it's a new album or created based on a previous album
  const handleCreateAlbum = (e) => {
    e.preventDefault()
    if (!albumNameInputRef.current.value) return
    if (fromAlbum) {
      if (!chosenPhotos.length) return
      createAlbum.create(albumNameInputRef.current.value, fromAlbum.owner, true, chosenPhotos, null, fromAlbum.thumbnail)
      setTimeout(() => {
        navigate('/albums')
      }, 500)
      return
    }
    createAlbum.create(albumNameInputRef.current.value)
    albumNameInputRef.current.value = ''
  }

  // Clean up chosen photos on unmount
  useEffect(() => {
    return () => {
      setChosenPhotos([])
    }
  }, [])

  return (
    <div className={styles.createAlbumWrapper}>
      <form onSubmit={handleCreateAlbum}>
        {/* Make form look different if it's rendered on Album-page (fromAlbum) */}
        {fromAlbum &&
          <div className={styles.selectionControlWrapper}>
            <label htmlFor="album-name">{`Create new album (from selected photos)`}</label>
            <div>
              <span className={styles.selectionBtn} onClick={() => setChosenPhotos(photoList)}>Select all</span>
              <span className={styles.selectionBtn} onClick={() => setChosenPhotos([])}>Clear selection</span>
            </div>
          </div>
        }
        <div className={styles.inputWrapper}>
          <input type="text" name="album-name" ref={albumNameInputRef} placeholder={!fromAlbum ? 'Add new album' : 'Album name'} required />
          <button type="submit">+</button>
        </div>
      </form>
    </div>
  )
}

export default CreateAlbum
