import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import PhotoList from '../components/PhotoList'
import UploadPhotos from '../components/UploadPhotos'
import { useAuthContext } from '../contexts/AuthContext'
import useAlbum from '../hooks/useAlbum'
import useAlbumPhotos from '../hooks/useAlbumPhotos'
import styles from '../css/Album.module.css'
import Lightbox from '../components/Lightbox'
import { usePhotoContext } from '../contexts/PhotoContext'
import useDeleteAlbum from '../hooks/useDeleteAlbum'
import useUpdateAlbum from '../hooks/useUpdateAlbum'

const Album = () => {
  const { photoToShow, setCurrentAlbum } = usePhotoContext()
  const changeNameInputRef = useRef()
  const { albumId } = useParams()
  const { currentUser } = useAuthContext()
  const [rename, setRename] = useState(false)
  const album = useAlbum(albumId)
  const albumPhotos = useAlbumPhotos(albumId)
  const { deleteAlbum } = useDeleteAlbum(album.data, albumPhotos.data)
  const updateAlbum = useUpdateAlbum()

  useEffect(() => {
    console.log(photoToShow)
  }, [photoToShow])

  useEffect(() => {
    console.log('album', album.data)
  }, [album.data])

  useEffect(() => {
    console.log('photos: ', albumPhotos.data)
    if (albumPhotos.data) setCurrentAlbum([...albumPhotos.data])
  }, [albumPhotos.data])

  const handleDeleteAlbum = () => {
    console.log('delete this: ', album.data)
    deleteAlbum()
  }

  const handleNameChange = (e) => {
    e.preventDefault()
    console.log('change name', changeNameInputRef.current.value)
    if (!changeNameInputRef.current.value) return console.log('please enter a name')
    if (changeNameInputRef.current.value === album.data.name) return console.log('same name')
    updateAlbum.rename(changeNameInputRef.current.value, album.data.id)
  }

  return (
    <div className={styles.albumWrapper}>
      <div>
        <h1>{album.data && album.data.name}</h1>
        {rename &&
          <form onSubmit={handleNameChange}>
            <input type="text" name="rename" ref={changeNameInputRef} defaultValue={album.data.name} required />
            <button type="submit"><i className="fas fa-check-square"></i></button>
          </form>}
        <button className={styles.renameBtn} onClick={() => setRename(!rename)}>Rename</button>
      </div>
      {album.data && <p>Review link: {`http://localhost:3000/review-album/${album.data.owner}/${album.data.id}`}</p>}
      <button onClick={handleDeleteAlbum} className={styles.deleteAlbum}><i className="fas fa-trash-alt"></i></button>
      <UploadPhotos albumId={albumId} />
      {albumPhotos.data && <PhotoList photos={albumPhotos.data} albumId={albumId} />}
      {photoToShow && <Lightbox photo={albumPhotos.data[photoToShow.current]} />}
    </div>
  )
}

export default Album
