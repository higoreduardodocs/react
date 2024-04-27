import { useContext, useState } from 'react'

import { AuthContext } from 'src/contexts/auth-context'
import { Auth as Layout } from 'src/layouts'
import { Common } from 'src/components'

function Dashboard() {
  const { auth } = useContext(AuthContext)
  const [isForm, setIsForm] = useState(false)
  const [isPassword, setIsPassword] = useState(false)

  return (
    <Layout title="Dashboard">
      <section>
        {isForm && <Common.ProfileForm setIsForm={setIsForm} {...auth?.user} />}
        {isPassword && <Common.PasswordForm setIsPassword={setIsPassword} />}
        <button type="button" onClick={() => setIsForm(true)}>
          Edit Profile
        </button>
        <button type="button" onClick={() => setIsPassword(true)}>
          Change Password
        </button>
        <div className="wrapper-page">
          <p>
            <b>Name:</b> {auth?.user?.name}
          </p>
          <p>
            <b>Email:</b> {auth?.user?.email}
          </p>
          <p>
            <b>Contact:</b> {auth?.user?.phone}
          </p>
          <p>
            <b>Address:</b> {auth?.user?.address}
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default Dashboard
