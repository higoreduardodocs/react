import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../libs/api'
import './success.style.scss'

function Success() {
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(document.location.search)
  const payment_intent = searchParams.get('payment_intent')

  const confirmPayment = async () => {
    try {
      await api.post('/orders/confirm-payment', { payment_intent })
      setTimeout(() => {
        navigate('/orders')
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    confirmPayment()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="success">
      Payment successful. You are being redirected to the orders page. Please do
      not close the page
    </div>
  )
}

export default Success
