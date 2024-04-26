import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { UserContext } from '../../contexts/user-context'
import api from '../../libs/api'
import './messages-id.style.scss'

const MessagesId = () => {
  const { currentUser } = useContext(UserContext)
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ['messagesId'],
    queryFn: () =>
      api.get(`/messages/conversation/${id}`).then((res) => res.data),
  })
  const mutation = useMutation({
    mutationFn: (message) => api.post('/messages', message),
    onSuccess: () => queryClient.invalidateQueries(['messagesId']),
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    mutation.mutate({
      conversationId: id,
      userId: currentUser._id,
      image: currentUser.image || '',
      description: e.target[0].value,
    })
    e.target[0].value = ''
  }

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages" className="link">
            Messages
          </Link>{' '}
          {'>'} {currentUser.username}
        </span>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Something went wrong</p>
        ) : !data?.length > 0 ? (
          <p>No messages founded</p>
        ) : (
          <div className="messages">
            {data.map((item) => (
              <div
                key={item._id}
                className={`${currentUser._id === item.userId && 'owner'} item`}
              >
                <img src={item.image || '/img/noavatar.jpg'} alt="Image" />
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}
        {!isLoading && !error && (
          <>
            <hr />
            <form className="write" onSubmit={handleSubmit}>
              <textarea type="text" placeholder="write a message" />
              <button type="submit">Send</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default MessagesId
