'use client'

import React from 'react'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'
import { FaArrowRight } from "react-icons/fa6";
import { Heading } from '../components/Heading'
import { Button } from '../components/Button'
import { ItemContent } from './ItemContent'
import { formatPrice } from '@/utils/formatPrice'

export const CartClient = () => {

    const {cartProducts, handleClearCart, cartTotalAmount} = useCart()
    if(!cartProducts || cartProducts.length === 0)
  {
    return (
    <div className='flex flex-col items-center'>
        <div className='text-2xl'>Votre panier est vide</div>
        <div>
            <Link href={"/"} className='text-slate-500 flex items-center gap-1 mt-2'>
                <MdArrowBack/>
            <span>Visitez la boutique</span>
            </Link>
        </div>
    </div>
  )
} return <div>
    <Heading title='Panier'center/>
    <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8'>
        <div className='col-span-2 justify-self-start'>
            PRODUIT
        </div>
        <div className='justify-self-center'>
            PRIX
        </div>
        <div className='justify-self-center'>
            QUANTITEE
        </div>
        <div className='justify-self-end'>
            TOTAL
        </div>
    </div>
    <div>{cartProducts && cartProducts.map((item)=>{
        return <ItemContent key={item.id} item={item}/>
        
    })}</div>
    <div className='border-t-[1.5px] border-slate-20 py-4 flex justify-between gap-4'>
        <div className='w-[120px]' >
            <Button label='Vider le panier' onClick={()=>{
                handleClearCart()
            }} small outline/>
        </div>
        <div className='text-sm flex flex-col gap-1 items-start'>
            
                <div className='flex justify-between w-full text-base font-semibold'>
                    <span>Sous-Total : </span>
                    <span>{formatPrice(cartTotalAmount)}</span>
                </div>
                <p className='taxt-slate-500 mx-auto'>Frais et expédition</p>
            <Button label='Commander' onClick={()=>{

            }} />
            
             <Link href={"/"} className='text-slate-500 flex items-center gap-1 mt-2'>
             <FaArrowRight />
             <span>Continuer votre visite</span>
             
             </Link>
            
        </div>
    </div>
</div>

}
