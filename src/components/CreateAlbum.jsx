import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateAlbum from '../hooks/useCreateAlbum'
import styles from "../css/CreateAlbum.module.css"
import { usePhotoContext } from '../contexts/PhotoContext'

const CreateAlbum = ({ fromAlbum, photoList, setIsCreating }) => {
  const createAlbum = useCreateAlbum()
  const albumNameInputRef = useRef()
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)
  const { chosenPhotos, setChosenPhotos, setShowReviews } = usePhotoContext()
  const navigate = useNavigate()

  // Create album, send in different data depending on if it's a new album or created based on a previous album
  const handleCreateAlbum = (e) => {
    e.preventDefault()
    if (!albumNameInputRef.current.value) return
    // Check if CreateAlbum is rendered on Album page
    if (fromAlbum) {
      // Set error message if no photos are chosen
      if (!chosenPhotos.length) {
        setIsError(true)
        setError('No photos selected')
        return
      }
      setIsCreating(true)
      // Create new album and set the new album with some of the data from the old album (that it's based on)
      createAlbum.create(albumNameInputRef.current.value, fromAlbum.owner, true, chosenPhotos, null, chosenPhotos[chosenPhotos.length - 1].url)
      setShowReviews(false)
      navigate('/albums')
      return
    }

    // If it's a brand new album, only set the album name here
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
        {/* Show error messages if on album page */}
        {fromAlbum && isError &&
          <div className={styles.errorWrapper}>
            <p>{error && error}</p>
          </div>}
        <div className={styles.inputWrapper}>
          <input type="text" name="album-name" ref={albumNameInputRef} placeholder={!fromAlbum ? 'Add new album' : 'Album name'} required />
          <button type="submit">+</button>
        </div>
      </form>
    </div>
  )
}

export default CreateAlbum
