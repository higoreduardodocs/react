/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'

import api from '../../../libs/api'
import Review from '../review'
import './reviews.style.scss'

function Reviews({ gigId }) {
  const [orders, setOrders] = useState([])
  const queryClient = new QueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => api.get(`/gigs/${gigId}/reviews`).then((res) => res.data),
  })
  const mutation = useMutation({
    mutationFn: (review) => api.post(`/gigs/${gigId}/reviews`, review),
    onSuccess: () => queryClient.invalidateQueries(['reviews']),
  })
  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`gigs/${gigId}/reviews`),
    onSuccess: () => queryClient.invalidateQueries(['reviews']),
  })
  const getOders = async () => {
    try {
      const { data } = await api.get(`/gigs/${gigId}/orders`)
      setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    mutation.mutate({
      description: e.target[0].value,
      star: e.target[1].value,
    })
  }
  useEffect(() => {
    getOders()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrong</p>
      ) : !data?.length > 0 ? (
        <p>Add the first review</p>
      ) : (
        data.map((item) => (
          <Review key={item._id} review={item} mutation={deleteMutation} />
        ))
      )}
      {!orders?.length > 0 ? (
        <p>Buy and review this gig</p>
      ) : (
        <div className="add">
          <h3>Add a review</h3>

          <form className="addForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="write your opinion" />
            <select name="" id="">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Reviews
