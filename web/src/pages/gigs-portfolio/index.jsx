import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { UserContext } from '../../contexts/user-context'
import api from '../../libs/api'
import './gigs-portfolio.style.scss'

function GigsPortfolio() {
  const { currentUser } = useContext(UserContext)
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ['gigsPortfolio'],
    queryFn: () =>
      api.get(`/gigs?userId=${currentUser._id}`).then((res) => res.data),
  })
  const mutation = useMutation({
    mutationFn: (id) => api.delete(`/gigs/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['gigsPortfolio']),
  })
  const handleDelete = async (id) => {
    mutation.mutate(id)
  }

  return (
    <div className="myGigs">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="container">
          <div className="title">
            <h1>{currentUser.isSeller ? 'Gigs' : 'Orders'}</h1>
            {currentUser.isSeller && (
              <Link to="/create-gig">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>

          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 &&
                data.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <Link to={`/gigs/${item._id}`}>
                        <img
                          className="image"
                          src={item.cover}
                          alt={item.title}
                        />
                      </Link>
                    </td>
                    <td>{item.title}</td>
                    <td>
                      ${item.price.toString().split('.')[0]}.
                      <sup>{item.price.toString().split('.')[1] || '00'}</sup>
                    </td>
                    <td>{item.sales}</td>
                    <td>
                      <img
                        src="./img/delete.png"
                        alt="Delete"
                        onClick={() => handleDelete(item._id)}
                        className="delete"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default GigsPortfolio
