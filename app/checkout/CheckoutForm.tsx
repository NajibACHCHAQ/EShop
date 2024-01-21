'use client'

import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/formatPrice'
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState,useEffect } from 'react'
import toast from 'react-hot-toast'
import { Heading } from '../components/Heading'
import { Button } from '../components/Button'

interface CheckoutFormProps{
    clientSecret:string,
    handleSetPaymentSuccess:(value:boolean)=>void
}
export const CheckoutForm:React.FC<CheckoutFormProps> = ({clientSecret,handleSetPaymentSuccess}) => {
    const {cartTotalAmount, handleClearCart, handleSetPaymentIntent} = useCart()
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const formatedPrice = formatPrice(cartTotalAmount)

    useEffect(()=>{
        if(!stripe){
            return
        }
        if(!clientSecret){
            return
        }
        handleSetPaymentSuccess(false)
    },[stripe])

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();

        if(!stripe || !elements){
            return
        }

        setIsLoading(true)

        stripe.confirmPayment(
            {elements, redirect:'if_required'}
        ).then(result =>{
            if(!result.error){
                toast.success('Paiement validé')
                handleClearCart()
                handleSetPaymentSuccess(true)
                handleSetPaymentIntent(null)
            }
            setIsLoading(false)
        })
    }

    
  return (
    <form onSubmit={handleSubmit} id='payment-form'>
        <div className='mb-6'>
            <Heading title='Renseignez vos informations de paiement'/>
        </div>
        <h2 className='font-semibold  mb-2'>Adresse</h2>
        <AddressElement options={{
            mode:'shipping',
            allowedCountries:["FR","ES","GB","BE"]
        }}/>
        <h2 className='font-semibold mt-4 mb-2'>Informations de paiement</h2>
        <PaymentElement id='payment-element' options={{layout:'tabs'}}/>
        <div className='mt-6 py-4 text-center text-slate-700 text-4xl font-bold'>
            Total: {formatedPrice}
        </div>
        <Button 
            label={isLoading ? 'En cours...' : 'Payer Maintenant'} 
            disabled={isLoading || !stripe || !elements} 
            onClick={()=>{}}/>
    </form>
  )
}
