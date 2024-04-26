/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import api from '../../../libs/api'
import './gig-card.style.scss'

function GigCard({ item }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['gigCard'],
    queryFn: () => api.get(`/users/${item.userId}`).then((res) => res.data),
  })
  return (
    <Link to={`/gigs/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt={item.title} />

        <div className="info">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="user">
              <img
                src={data.image || '/img/noavatar.jpg'}
                alt={data.username}
              />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.description.substring(0, 70)}</p>
          <div className="star">
            <img src="./img/star.png" alt="Star" />
            <span>
              {!isNaN(item.starAmount / item.starNumber) &&
                Math.round(item.starAmount / item.starNumber)}
            </span>
          </div>
        </div>

        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="Heart" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              ${item.price.toString().split('.')[0]}.
              <sup>{item.price.toString().split('.')[1] || '00'}</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GigCard
