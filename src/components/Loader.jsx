import React from 'react'
import styles from '../css/Loader.module.css'
import BounceLoader from 'react-spinners/BounceLoader'

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <BounceLoader color={'#eee'} />
    </div>
  )
}

export default Loader