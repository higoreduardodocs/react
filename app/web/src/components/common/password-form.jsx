/* eslint-disable react/prop-types */
import { useState } from 'react'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'

function PasswordForm({ setIsPassword }) {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const clearFields = () => {
    setPassword('')
    setNewPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.put(`/users/change-password`, {
        password,
        newPassword,
      })
      toast.success('Update successfully 🤗')
      clearFields()
      setIsPassword(false)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  return (
    <form className="wrapper-page" onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Your Password"
        required
      />

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter Your Password"
        required
      />

      <button type="submit">Save</button>
      <button
        type="button"
        onClick={() => {
          setIsPassword(false)
          clearFields()
        }}
      >
        Cancel
      </button>
    </form>
  )
}

export default PasswordForm
