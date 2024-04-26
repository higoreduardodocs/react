import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../libs/api'
import upload from '../../libs/upload'
import './register.style.scss'

function Register() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    image: '',
    country: '',
    phone: '',
    description: '',
    isSeller: false,
  })

  const handleSeller = (e) => {
    setUser((prevState) => ({ ...prevState, isSeller: e.target.checked }))
  }
  const handleChangeUser = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }
  const clearFields = () => {
    let _user = {}
    Object.keys(user).map((key) => {
      _user[key] = ''
    })
    setUser(_user)
    setFile(null)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    const imageUrl = await upload(file)

    try {
      await api.post('/auth/create', { ...user, image: imageUrl })
      clearFields()
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            value={user.username}
            onChange={(e) => handleChangeUser(e)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => handleChangeUser(e)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => handleChangeUser(e)}
          />

          <label htmlFor="file">Profile Picture</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Enter your country"
            value={user.country}
            onChange={(e) => handleChangeUser(e)}
          />

          <button type="submit">Register</button>
        </div>

        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="switch">Activate the seller account</label>
            <label className="switch">
              <input
                type="checkbox"
                id="switch"
                value={user.isSeller}
                onChange={handleSeller}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter your phone"
            value={user.phone}
            onChange={(e) => handleChangeUser(e)}
          />

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Enter a short description of yourself"
            value={user.description}
            onChange={handleChangeUser}
          ></textarea>
        </div>
      </form>
    </section>
  )
}

export default Register
