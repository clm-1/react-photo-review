import React, { createContext, useContext, useEffect, useState } from 'react'

const PhotoContext = createContext()

const usePhotoContext = () => {
  return useContext(PhotoContext)
}

const PhotoContextProvider = ({ children }) => {
  const [photoToShow, setPhotoToShow] = useState(null)

  const values = {
    photoToShow,
    setPhotoToShow
  }

  return (
    <PhotoContext.Provider value={values}>
      { children }
    </PhotoContext.Provider>
  )
}

export { usePhotoContext, PhotoContextProvider as default }