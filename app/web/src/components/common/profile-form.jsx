/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { AuthContext } from 'src/contexts/auth-context'

function ProfileForm({
  setIsForm,
  name: existedName,
  email: existedEmail,
  phone: existedPhone,
  address: existedAddress,
}) {
  const { handleUser } = useContext(AuthContext)
  const [name, setName] = useState(existedName || '')
  const [email, setEmail] = useState(existedEmail || '')
  const [phone, setPhone] = useState(existedPhone || '')
  const [address, setAddress] = useState(existedAddress || '')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await api.put(`/users`, {
        name,
        phone,
        address,
      })
      handleUser(data)
      toast.success('Update successfully 🤗')
      setIsForm(false)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  return (
    <form className="wrapper-page" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
        required
      />

      <input
        type="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Your Email "
        disabled
      />

      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter Your Phone"
        required
      />

      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Your Address"
        required
      />

      <button type="submit">Save</button>
      <button
        type="button"
        onClick={() => {
          setIsForm(false)
        }}
      >
        Cancel
      </button>
    </form>
  )
}

export default ProfileForm
