import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'

const useAlbums = () => {
  const { currentUser } = useAuthContext()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const getAlbumsForUser = async () => {
    // if (!currentUser) return

    // get reference to collection
		try {
      const albumRef = collection(db, 'albums')
      const queryRef = query(albumRef, where(`owner`, '==', currentUser.uid))
      const snapshot = await getDocs(queryRef)
  
      const data = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      setData(data)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }		
  }

  useEffect(() => {
    getAlbumsForUser()
  }, [])

  return {
    data,
    loading
  }
}

export default useAlbums
