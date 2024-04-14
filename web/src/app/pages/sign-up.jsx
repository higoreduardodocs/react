import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

import { auth, storage, db } from '../../libs/firebase'

export default function SignUp() {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const displayName = event.target[0]?.value
      const email = event.target[1]?.value
      const password = event.target[2]?.value
      const image = event.target[3]?.files[0]

      const res = await createUserWithEmailAndPassword(auth, email, password)
      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}`)
      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then((async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, "userChats", res.user.uid), {})
            navigate('/')
          } catch (error) {
            setError(true)
            console.log(error)
          }
        }))
      })
    } catch (error) {
      setError(true)
      console.log(error)
    } finally {
      setLoading(false)
      event.target.reset()
    }
  }

  return (
    <section className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat App</span>
        <span className="title">Cadastro</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Usuário" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Senha" />
          <input style={{ display: 'none' }} type="file" id="profile-image" />
          <label htmlFor="profile-image">
            <img src="/image-icon.png" alt="Adicionar imagem de perfil" />
            <span>Imagem de perfil</span>
          </label>
          <button disabled={loading}>Cadastrar</button>
          {loading && <p>Aguarde estamos criando sua conta</p>}
          {error && <p>Erro no seu cadastro, revise suas informações</p>}
        </form>
        <p>Possui uma conta? <Link to="/login">Fazer login</Link></p>
      </div>
    </section>
  )
}
