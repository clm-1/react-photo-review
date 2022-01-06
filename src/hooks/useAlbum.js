import { useFirestoreDocument } from '@react-query-firebase/firestore'
import { doc } from 'firebase/firestore'
import { db } from '../firebase'

const useAlbum = (albumId) => {
  const albumRef = doc(db, 'albums', albumId)
  const albumQuery = useFirestoreDocument(['album', albumId], albumRef)

  return albumQuery
}

export default useAlbum
