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
import NoContent from '../components/NoContent'

const Album = () => {
  const { albumId } = useParams()
  const { photoToShow, setCurrentAlbum } = usePhotoContext()
  const album = useAlbum(albumId)
  const albumPhotos = useAlbumPhotos(albumId)
  const { deleteAlbum, isDeleting } = useDeleteAlbum(album.data, albumPhotos.data)
  const [rename, setRename] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const updateAlbum = useUpdateAlbum()
  const changeNameInputRef = useRef()
  const navigate = useNavigate()
  const reviewLinkRef = useRef()

  useEffect(() => {
    if (album.data === null) return navigate('/albums')
    if (album.data && !album.data.viewed) {
      updateAlbum.setViewed(albumId)
    }
  }, [album.data])

  // Set current album in context when data is loaded or changes
  // Set thumbnail (if no thumbnail currently exists)
  useEffect(() => {
    if (albumPhotos.data) setCurrentAlbum([...albumPhotos.data])
    if (isDeleting) return
    if (album.data && albumPhotos.data && !albumPhotos.data.length) updateAlbum.setThumbnail(null, album.data.id)
    if (albumPhotos.data && albumPhotos.data.length && !album.thumbnail) {
      updateAlbum.setThumbnail(albumPhotos.data[albumPhotos.data.length - 1].url, album.data.id)
    }
  }, [albumPhotos.data])

  const handleDeleteAlbum = () => {
    deleteAlbum()
  }

  // Change name of album
  const handleNameChange = (e) => {
    e.preventDefault()
    console.log('change name', changeNameInputRef.current.value)
    if (!changeNameInputRef.current.value) return console.log('please enter a name')
    if (changeNameInputRef.current.value === album.data.name) return setRename(false)
    setRename(false)
    updateAlbum.rename(changeNameInputRef.current.value, album.data.id)
  }

  // Copy review link to clipboard on button click
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(reviewLinkRef.current.value)
  }

  return (
    <>
      {album.data && albumPhotos.data &&
        <div className={`${styles.albumPageWrapper}`}>
          {album.data && album.data.reviewedBy &&
            <div className={styles.reviewedAlbumMsg}>
              <p>Album review by: {album.data.reviewedBy}</p>
              {album.data.comment &&
                <div className={styles.commentWrapper}>
                  <p onClick={() => setShowComment(!showComment)} className={styles.showComment}>{showComment ? 'Hide comment' : 'Show comment'}</p>
                  {showComment && <p className={styles.reviewComment}>"{album.data.comment}"</p>}
                </div>
              }
            </div>}
          <div className={`${styles.albumWrapper} ${isDeleting ? styles.isDeletingAlbum : ''}`}>
            <div className={styles.topBar}>
              <p onClick={() => navigate('/albums')}><span>{`<`}</span> Back to albums</p>
              <div className={styles.topBarBtns}>
                <button onClick={() => setRename(!rename)} className={styles.albumBtn}><i className="fas fa-edit"></i></button>
                <button onClick={handleDeleteAlbum} className={styles.albumBtn}><i className="fas fa-trash-alt"></i></button>
              </div>
            </div>
            <hr />
            <div className={styles.albumHeader}>
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
            {albumPhotos.data && albumPhotos.data.length ? <PhotoList photos={albumPhotos.data} albumId={albumId} /> : ''}
            {albumPhotos.data && !albumPhotos.data.length ? <NoContent album={true} /> : ''}
            <hr className={styles.bottomHr} />
            {album.data && <CreateAlbum fromAlbum={album.data} photoList={albumPhotos.data ? albumPhotos.data : false} />}
            {photoToShow && <Lightbox photo={albumPhotos.data[photoToShow.current]} />}
          </div>
        </div>}
    </>
  )
}

export default Album
