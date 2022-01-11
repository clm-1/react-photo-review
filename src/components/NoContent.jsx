import React from 'react'
import styles from '../css/NoContent.module.css'

// No content-message for albums and album pages
const NoContent = ({ reviews, album }) => {
  return (
    <div className={styles.noContentWrapper}>
      <i className="fas fa-images"></i>
      <p>{album ? 'There are no photos in this album yet' : reviews ? 'You have no album reviews yet' : 'You have not created any albums yet'}</p>
    </div>
  )
}

export default NoContent
