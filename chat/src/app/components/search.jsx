import { useState } from 'react'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'

import { db } from '../../libs/firebase'
import useUser from '../../hooks/use-user'

export default function Search() {
  const { user } = useUser()
  const [searchUser, setSearchUser] = useState(null)
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState(false)

  const handleKey = (event) => event.code === 'Enter' && handleSearch()
  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', displayName)
    )

    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((item) => {
        if (item.data().uid !== user.uid) setSearchUser(item.data())
      })
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }
  const handleSelect = async () => {
    const combinedUid =
      user.uid > searchUser.uid
        ? user.uid + searchUser.uid
        : searchUser.uid + user.uid

    try {
      const res = await getDoc(doc(db, 'chats', combinedUid))

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedUid), { messages: [] })
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedUid + '.userInfo']: {
            uid: searchUser.uid,
            displayName: searchUser.displayName,
            photoURL: searchUser.photoURL,
          },
          [combinedUid + '.date']: serverTimestamp(),
        })
        await updateDoc(doc(db, 'userChats', searchUser.uid), {
          [combinedUid + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedUid + '.date']: serverTimestamp(),
        })
      }
    } catch (error) {
      console.log(error)
    }
    setSearchUser(null)
    setDisplayName('')
  }
  return (
    <div className="search">
      <div className="search-form">
        <input
          type="text"
          onKeyDown={handleKey}
          onChange={(event) => setDisplayName(event.target.value)}
          value={displayName}
          placeholder="Pesquisar"
        />
      </div>
      {error && <p>Usuário não encontrado</p>}
      {searchUser && !error && (
        <div className="user-chats" onClick={handleSelect}>
          <img src={searchUser.photoURL} alt={searchUser.displayName} />
          <span>{searchUser.displayName}</span>
        </div>
      )}
    </div>
  )
}
