import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { Admin as Layout } from 'src/layouts'

function Users() {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const { data } = await api.get(`/users`)
      setUsers(data)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`)
      toast.success('Deleted successfully 🤗')
      getUsers()
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Layout title="Users">
      <section>
        <div className="wrapper-page">
          {!users?.length > 0 ? (
            <h1>User List Is Empty</h1>
          ) : (
            <h1>Founded {users.length} users</h1>
          )}
        </div>
        {users?.length > 0 && (
          <div className="wrapper-page">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => deleteUser(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default Users
