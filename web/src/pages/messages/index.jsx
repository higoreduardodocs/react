import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'

import { UserContext } from '../../contexts/user-context'
import api from '../../libs/api'
import './messages.style.scss'

const Messages = () => {
  const { currentUser } = useContext(UserContext)
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () => api.get('/conversations').then((res) => res.data),
  })
  const mutation = useMutation({
    mutationFn: (id) => api.put(`/conversations/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries(['messages']),
  })
  const handleRead = (id) => {
    mutation.mutate(id)
  }

  return (
    <div className="messages">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrogn</p>
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? 'Buyer' : 'Seller'}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!data?.length > 0 ? (
                <p>No messages founded</p>
              ) : (
                data.map((item) => (
                  <tr
                    key={item._id}
                    className={
                      ((currentUser.isSeller && !item.readBySeller) ||
                        (!currentUser.isSeller && !item.readByBuyer)) &&
                      'active'
                    }
                  >
                    <td>
                      {currentUser.isSeller ? item.buyerName : item.sellerName}
                    </td>
                    <td>
                      <Link to={`/messages/${item._id}`} className="link">
                        {item?.lastMessage?.substring(0, 100)}...
                      </Link>
                    </td>
                    <td>{moment(item.updatedAt).fromNow()}</td>
                    <td>
                      {(currentUser.isSeller && !item.readBySeller) ||
                      (!currentUser.isSeller && !item.readByBuyer) ? (
                        <button onClick={() => handleRead(item.id)}>
                          Mark as Read
                        </button>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Messages
