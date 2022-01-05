import React, { useRef } from 'react'
import useCreateAlbum from '../hooks/useCreateAlbum'

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
    <div>
      <form onSubmit={handleCreateAlbum}>
        <label htmlFor="album-name">Enter new album name</label>
        <input type="text" name="album-name" ref={albumNameInputRef} required/>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateAlbum
