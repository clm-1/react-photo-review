import React, { createContext, useContext, useEffect, useState } from 'react'

const PhotoContext = createContext()

const usePhotoContext = () => {
  return useContext(PhotoContext)
}

const PhotoContextProvider = ({ children }) => {
  const [photoToShow, setPhotoToShow] = useState(null)
  const [chosenPhotos, setChosenPhotos] = useState([])
  const [notChosenPhotos, setNotChosenPhotos] = useState([])
  const [currentAlbum, setCurrentAlbum] = useState(null)
  const [photoReviewError, setPhotoReviewError] = useState(null)

  const values = {
    photoToShow,
    setPhotoToShow,
    chosenPhotos,
    setChosenPhotos,
    currentAlbum,
    setCurrentAlbum,
    notChosenPhotos,
    setNotChosenPhotos,
    photoReviewError,
    setPhotoReviewError,
  }

  return (
    <PhotoContext.Provider value={values}>
      { children }
    </PhotoContext.Provider>
  )
}

export { usePhotoContext, PhotoContextProvider as default }