import { useState } from 'react'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { Public as Layout } from 'src/layouts'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const clearFields = () => {
    setEmail('')
    setNewPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.put('/users/reset-password', {
        email,
        newPassword,
      })
      toast.success('Reset successfully 🤗')
      clearFields()
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  return (
    <Layout title="Reset Password">
      <section className="container">
        <form onSubmit={handleSubmit} className="login-container">
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email "
            required
          />

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter Your New Password"
            required
          />

          <button type="submit">Reset password</button>
        </form>
      </section>
    </Layout>
  )
}

export default ForgotPassword
