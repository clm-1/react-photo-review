import React, { createContext, useContext, useEffect, useState } from 'react'

const PhotoContext = createContext()

const usePhotoContext = () => {
  return useContext(PhotoContext)
}

const PhotoContextProvider = ({ children }) => {
  // Photo to be shown in lightbox
  const [photoToShow, setPhotoToShow] = useState(null)

  // Photos chosen on album page and review page
  const [chosenPhotos, setChosenPhotos] = useState([])

  // Photos not chosen on review page
  const [notChosenPhotos, setNotChosenPhotos] = useState([])

  // Keep track of photos that are in current album on album page (need data to create new albums)
  const [currentAlbum, setCurrentAlbum] = useState(null)

  // If there is an error with photo review
  const [photoReviewError, setPhotoReviewError] = useState(null)
  
  // Show reviews tab on albums page
  const [showReviews, setShowReviews] = useState(false)

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
    showReviews,
    setShowReviews,
  }

  return (
    <PhotoContext.Provider value={values}>
      { children }
    </PhotoContext.Provider>
  )
}

export { usePhotoContext, PhotoContextProvider as default }