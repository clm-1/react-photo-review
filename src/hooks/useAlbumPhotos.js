import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { collection, where, query, orderBy } from 'firebase/firestore'

const useAlbumPhotos = (albumId) => {
  const queryRef = query((collection(db, 'photos')), where(`albums`, 'array-contains', albumId), orderBy('created', 'desc'))
  const photosQuery = useFirestoreQueryData(['photos', albumId], queryRef, {
    idField: 'id',
    subscribe: true,
  }, {
    refetchOnMount: 'always'
  })

  return photosQuery
}

export default useAlbumPhotos
