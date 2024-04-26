import { Link, useParams } from 'react-router-dom'
import { Slider } from 'infinite-react-carousel/lib'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { UserContext } from '../../contexts/user-context'
import api from '../../libs/api'
import Reviews from './reviews'
import './gig-id.style.scss'

function GigId() {
  const { currentUser } = useContext(UserContext)
  const { id } = useParams()

  const { isLoading, error, data } = useQuery({
    queryKey: ['gigId'],
    queryFn: () => api.get(`/gigs/${id}`).then((res) => res.data),
  })

  const userId = data?.userId
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => api.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  })

  return (
    <div className="gig">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">Fiverr {'>'} Graphics & Design</span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              <p>Loading...</p>
            ) : errorUser ? (
              <p>Something went wrong</p>
            ) : (
              <div className="user">
                <img
                  src={dataUser.image || '/img/noavatar.jpg'}
                  alt={dataUser.username}
                  className="profile"
                />
                <span>{dataUser.username}</span>
                <div className="stars">
                  {!isNaN(data.starAmount / data.starNumber) && (
                    <>
                      {Array.from(
                        {
                          length: Math.round(data.starAmount / data.starNumber),
                        },
                        (_, k) => k + 1
                      ).map((_, i) => (
                        <img key={i} src="/img/star.png" alt="start" />
                      ))}
                      <span>
                        {Math.round(data.starAmount / data.starNumber)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data?.images?.length > 0 &&
                data.images.map((item, i) => (
                  <img key={i} src={item} alt="Image" />
                ))}
            </Slider>

            <h2>About This Gig</h2>
            <p>{data.description}</p>
            {isLoadingUser ? (
              <p>Loading...</p>
            ) : errorUser ? (
              <p>Something went wrong</p>
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img
                    src={dataUser.image || '/img/noavatar.jpg'}
                    alt={dataUser.username}
                    className="profile"
                  />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    <div className="stars">
                      {!isNaN(data.starAmount / data.starNumber) && (
                        <>
                          {Array.from(
                            {
                              length: Math.round(
                                data.starAmount / data.starNumber
                              ),
                            },
                            (_, k) => k + 1
                          ).map((_, i) => (
                            <img key={i} src="/img/star.png" alt="start" />
                          ))}
                          <span>
                            {Math.round(data.starAmount / data.starNumber)}
                          </span>
                        </>
                      )}
                    </div>
                    <button>Contact Me</button>
                  </div>
                </div>

                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="description">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="description">
                        {new Date(dataUser.createdAt).toDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="description">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="description">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="description">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.description}</p>
                </div>
              </div>
            )}

            <Reviews gigId={id} />
          </div>

          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>
                ${data.price.toString().split('.')[0]}.
                <sup>{data.price.toString().split('.')[1] || '00'}</sup>
              </h2>
            </div>
            <p>{data.shortDescription}</p>

            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="Clock" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="Revisions" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>

            <div className="features">
              {data?.features?.length > 0 &&
                data.features.map((item, i) => (
                  <div key={i} className="item">
                    <img src="/img/greencheck.png" alt="Check" />
                    <span>{item}</span>
                  </div>
                ))}
            </div>

            {!currentUser ||
              (!currentUser.isSeller && (
                <Link to={`/payment/${id}`} className="link">
                  Continue
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default GigId
