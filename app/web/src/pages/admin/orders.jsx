import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { processOrder } from 'src/utils'
import { Admin as Layout } from 'src/layouts'

function Orders() {
  const [orders, setOrders] = useState([])
  const [order, setOrder] = useState(null)

  const getOrders = async () => {
    try {
      const { data } = await api.get(`/orders/administrator`)
      setOrders(data)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  const viewOrder = async (id) => {
    try {
      const { data } = await api.get(`/orders/administrator/${id}`)
      setOrder(data)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, {
        status,
      })
      getOrders()
      toast.success('Update successfully 🤗')
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
    <Layout title="Orders">
      <section>
        <div className="wrapper-page">
          {!orders?.length > 0 ? (
            <h1>Order List Is Empty</h1>
          ) : (
            <h1>Founded {orders.length} orders</h1>
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
              <p>
                <b>Customer:</b>&nbsp;{order?.customer?.name}
              </p>
              <p>
                <b>Address:</b>&nbsp;{order?.customer?.address}
              </p>
              <p>
                <b>Phone:</b>&nbsp;{order?.customer?.phone}
              </p>
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
                <th>Customer</th>
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
                    <td>{item?.customer?.name}</td>
                    <td>
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item._id, e.target.value)}
                      >
                        {Object.keys(processOrder).map((key, i) => (
                          <option key={i} value={processOrder[key]}>
                            {key}
                          </option>
                        ))}
                      </select>
                    </td>
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
