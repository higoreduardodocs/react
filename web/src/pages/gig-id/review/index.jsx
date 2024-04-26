/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import { UserContext } from '../../../contexts/user-context'
import api from '../../../libs/api'
import './review.style.scss'

function Review({ review, mutation }) {
  const { currentUser } = useContext(UserContext)

  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () => api.get(`/users/${review.userId}`).then((res) => res.data),
  })
  const handleDelete = () => {
    mutation.mutate()
  }
  return (
    <div className="review">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <div className="wrapper">
          <div className="user">
            <img
              src={data.image || '/img/noavatar.jpg'}
              alt={data.username}
              className="profile"
            />
            <div className="info">
              <span>{data.username}</span>
              <div className="country">
                <img
                  src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                  alt={data.country}
                />
                <span>{data.country}</span>
              </div>
            </div>
          </div>
          {currentUser && review.userId === currentUser._id && (
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      )}

      <div className="stars">
        {Array(review.star)
          .fill()
          .map((_, i) => (
            <img key={i} src="/img/star.png" alt="Star" />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.description}</p>

      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="Like" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="Dislike" />
        <span>No</span>
      </div>
    </div>
  )
}

export default Review
