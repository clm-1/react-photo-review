import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { collection, where, query, orderBy } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'

// Fetch multiple albums from db for current user
const useAlbums = () => {
  const { currentUser } = useAuthContext()

  // Create the query for the collection
  const queryRef = query((collection(db, 'albums')), where(`owner`, '==', currentUser.uid), orderBy('created', 'desc'))

  // Get data from firestore using react query
  const albumsQuery = useFirestoreQueryData(['albums', currentUser.uid], queryRef, {
    idField: 'id',
    subscribe: true,
  }, {
    refetchOnMount: 'always'
  })

  return albumsQuery
}

export default useAlbums
