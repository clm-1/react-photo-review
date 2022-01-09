import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
import noThumbnail from '../assets/images/no-thumbnail.png'
import { createDateTimeString } from '../helpers/time'
import CreateAlbum from '../components/CreateAlbum'

const Album = () => {
  const { albumId } = useParams()
  const { photoToShow, setCurrentAlbum } = usePhotoContext()
  const album = useAlbum(albumId)
  const albumPhotos = useAlbumPhotos(albumId)
  const { deleteAlbum } = useDeleteAlbum(album.data, albumPhotos.data)
  const [rename, setRename] = useState(false)
  const updateAlbum = useUpdateAlbum()
  const changeNameInputRef = useRef()
  const navigate = useNavigate()
  const reviewLinkRef = useRef()

  useEffect(() => {
    console.log(photoToShow)
  }, [photoToShow])

  useEffect(() => {
    console.log('album', album.data)
    if (album.data && !album.data.viewed) {
      updateAlbum.setViewed(albumId)
    }
  }, [album.data])

  useEffect(() => {
    console.log('photos: ', albumPhotos.data)
    if (albumPhotos.data) setCurrentAlbum([...albumPhotos.data])
    if (albumPhotos.data && albumPhotos.data.length && !album.thumbnail) {
      console.log('func', updateAlbum.setThumbnail)
      updateAlbum.setThumbnail(albumPhotos.data[albumPhotos.data.length - 1].url, album.data.id)
    }
  }, [albumPhotos.data])

  const handleDeleteAlbum = () => {
    console.log('delete this: ', album.data)
    deleteAlbum()
  }

  const handleNameChange = (e) => {
    e.preventDefault()
    console.log('change name', changeNameInputRef.current.value)
    if (!changeNameInputRef.current.value) return console.log('please enter a name')
    if (changeNameInputRef.current.value === album.data.name) return setRename(false)
    setRename(false)
    updateAlbum.rename(changeNameInputRef.current.value, album.data.id)
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(reviewLinkRef.current.value)
  }

  return (
    <>
        <div className={styles.albumPageWrapper}>
          <div className={styles.albumWrapper}>
            <div className={styles.topBar}>
              <p onClick={() => navigate('/albums')}><span>{`<`}</span> Back to albums</p>
              <div className={styles.topBarBtns}>
                <button onClick={() => setRename(!rename)} className={styles.albumBtn}><i className="fas fa-edit"></i></button>
                <button className={styles.albumBtn}><i className="fas fa-code-branch"></i></button>
                <button onClick={handleDeleteAlbum} className={styles.albumBtn}><i className="fas fa-trash-alt"></i></button>
              </div>
            </div>
            <hr />
            <div className={styles.albumHeader}>
              {/* <div className={styles.albumThumbnailWrapper}>
                <img src={album.data.thumbnail ? album.data.thumbnail : noThumbnail}></img>
              </div> */}
              {album.data && !rename &&
                <>
                  <div className={styles.albumInfo}>
                    <div className={styles.albumTitle}>
                      <h1>{album.data.name}</h1>
                      <h2>{createDateTimeString(album.data.created)}</h2>
                    </div>
                    {albumPhotos.data && <div className={styles.albumStats}>
                      <div className={styles.stat}>
                        <p>{albumPhotos.data.length}</p>
                        <p>{albumPhotos.data.length === 1 ? 'Photo' : 'Photos'}</p>
                      </div>
                    </div>}
                  </div>
                </>}
              {rename &&
                <form onSubmit={handleNameChange}>
                  <label htmlFor="rename">Enter new album name</label>
                  <div className={styles.inputWrapper}>
                    <input type="text" name="rename" ref={changeNameInputRef} defaultValue={album.data.name} required />
                    <button type="submit"><i className="fas fa-check"></i></button>
                  </div>
                </form>}
            </div>
            {album.data && 
              <div className={styles.reviewLinkWrapper}>
                <input ref={reviewLinkRef} readOnly="readonly" className={styles.reviewLink} value={`http://localhost:3000/review-album/${album.data.owner}/${album.data.id}`}></input>
                <button onClick={handleCopyToClipboard}><i className="fas fa-paste"></i></button>
              </div>}
            <UploadPhotos albumId={albumId} />
            {albumPhotos.data && <PhotoList photos={albumPhotos.data} albumId={albumId} />}
            <hr className={styles.bottomHr} />
            {album.data && <CreateAlbum fromAlbum={album.data} photoList={albumPhotos.data ? albumPhotos.data : false}/>}
            {photoToShow && <Lightbox photo={albumPhotos.data[photoToShow.current]} />}
          </div>
        </div>
    </>
  )
}

export default Album
