import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import api from '../../libs/api'
import Checkout from './checkout'
import './payment.style.scss'

function Payment() {
  const { gigId } = useParams()
  const [clientSecret, setClientSecret] = useState('')
  const stripePromise = loadStripe(
    import.meta.env.VITE_PAYMENT_STRIPE_PUBLIC_KEY
  )
  const appearance = { theme: 'stripe' }
  const options = { clientSecret, appearance }

  const makePayment = async () => {
    try {
      const { data } = await api.post(`/orders/make-payment`, { gigId })
      console.log(data)
      setClientSecret(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    makePayment()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="pay">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <Checkout />
        </Elements>
      )}
    </section>
  )
}

export default Payment
