'use client'
import { useCart } from '@/hooks/useCart'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

export const CheckoutClient = () => {
    const {cartProducts, paymentIntent, handleSetPaymentIntent} = useCart()
    const [ loading, setLoading ] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret,setClientSecret] = useState('')

    const router = useRouter()

    console.log('paymentIntent', paymentIntent);
    console.log('clientSecret', clientSecret);
    

    useEffect(()=>{
        if(cartProducts){
            setLoading(true)
            setError(false)

            fetch('/api/create-payment-intent',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    items:cartProducts,
                    payment_intent_id:paymentIntent
                })
            }).then((res)=>{
                setLoading(false)
                if(res.status === 401){
                    return router.push('/login')
                }
                return res.json()
            }).then((data)=>{
                setClientSecret(data.paymentIntent.client_secret)
                handleSetPaymentIntent(data.paymentIntent.id)
            }).catch((error)=>{
                setError(true)
                toast.error('Something is wrong')
            })
        }
    },[cartProducts, paymentIntent])
  return (
    <div>CheckoutClient</div>
  )
}
