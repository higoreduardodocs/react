import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuid } from 'uuid'

import useChat from '../../hooks/use-chat'
import useUser from '../../hooks/use-user'
import { db, storage } from '../../libs/firebase'
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

export default function Input() {
  const { user } = useUser()
  const { state: userChat } = useChat()

  const handleSend = async (event) => {
    event.preventDefault()
    const text = event.target[0]?.value
    const image = event.target[1]?.files[0]
    event.target.reset()

    try {
      if (image) {
        const storageRef = ref(storage, uuid())
        const uploadTask = uploadBytesResumable(storageRef, image)
        uploadTask.on(
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, 'chats', userChat.chatId), {
                  messages: arrayUnion({
                    uid: uuid(),
                    senderUid: user.uid,
                    text,
                    image: downloadURL,
                    date: Timestamp.now(),
                  }),
                })
              }
            )
          }
        )
      } else {
        await updateDoc(doc(db, 'chats', userChat.chatId), {
          messages: arrayUnion({
            uid: uuid(),
            senderUid: user.uid,
            text,
            date: Timestamp.now(),
          }),
        })
      }

      await updateDoc(doc(db, 'userChats', user.uid), {
        [userChat.chatId + '.lastMessage']: text,
        [userChat.chatId + '.date']: serverTimestamp(),
      })
      await updateDoc(doc(db, 'userChats', userChat.user.uid), {
        [userChat.chatId + '.lastMessage']: text,
        [userChat.chatId + '.date']: serverTimestamp(),
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form className="input" onSubmit={handleSend}>
      <input type="text" placeholder="Insira sua mensagem" />
      <div className="input-icons">
        <img src="/attach-icon.png" alt="Anexar documento" />
        <input type="file" id="image" style={{ display: 'none' }} />
        <label htmlFor="image">
          <img src="/image-icon.png" alt="Adicionar imagem" />
        </label>
        <button>Enviar</button>
      </div>
    </form>
  )
}
