import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { Auth as Layout } from 'src/layouts'

function Orders() {
  const [orders, setOrders] = useState([])
  const [order, setOrder] = useState(null)

  const getOrders = async () => {
    try {
      const { data } = await api.get(`/orders/customer`)
      setOrders(data)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  const viewOrder = async (id) => {
    try {
      const { data } = await api.get(`/orders/customer/${id}`)
      setOrder(data)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <Layout title="Dashboard">
      <section>
        <div className="wrapper-page">
          {!orders?.length > 0 ? (
            <h1>Your Orders Is Empty</h1>
          ) : (
            <h1>You Has Orders {orders.length}</h1>
          )}
        </div>
        {order && (
          <div className="wrapper-page cart-list">
            {order?.payload?.length > 0 &&
              order.payload.map((item) => (
                <div key={item._id} className="cart-item">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/products/${
                      item._id
                    }/photo`}
                    alt={item.name}
                    height="100px"
                    width="100px"
                  />

                  <div>
                    <p>
                      <b>Name:</b>&nbsp;{item.name}
                    </p>
                    <p>
                      <b>Price:</b>&nbsp;
                      {item.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </p>
                    <p>
                      <b>Cart Quantity:</b>&nbsp;
                      {item.cartQuantity}
                    </p>
                    <p>
                      <b>SubTotal:</b>&nbsp;
                      {(item.price * item.cartQuantity).toLocaleString(
                        'en-US',
                        {
                          style: 'currency',
                          currency: 'USD',
                        }
                      )}
                    </p>
                  </div>
                </div>
              ))}
            <p>
              <b>Status:</b>&nbsp;{order?.status}
            </p>
            <p>
              <b>Total:</b>&nbsp;
              {order.payload
                .reduce((acc, cur) => acc + cur.price * cur.cartQuantity, 0)
                .toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
            </p>
            <button type="button" onClick={() => setOrder(null)}>
              Close
            </button>
          </div>
        )}
        {orders?.length > 0 && (
          <div className="wrapper-page">
            <table>
              <thead>
                <th>#</th>
                <th>Status</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </thead>
              <tbody>
                {orders.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.status}</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>
                      {item?.payload?.reduce(
                        (acc, cur) => acc + cur.cartQuantity,
                        0
                      )}
                    </td>
                    <td>
                      {item?.payload
                        ?.reduce(
                          (acc, cur) => acc + cur.cartQuantity * cur.price,
                          0
                        )
                        .toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                    </td>
                    <td>
                      <button type="button" onClick={() => viewOrder(item._id)}>
                        View
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

export default Orders
