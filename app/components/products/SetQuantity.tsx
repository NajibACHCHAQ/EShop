'use client'
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import { dividerClasses } from '@mui/material';
import React from 'react'

interface SetQuantityProps{
    cartCounter?:boolean;
    cartProduct:CartProductType;
    handleQuantityIncrease:()=> void;
    handleQuantityDecrease:()=> void;
}
const btnStyles = 'pr-2 pl-2 border-[1.2px] border-slate-300';
export const SetQuantity:React.FC<SetQuantityProps> = ({cartCounter,cartProduct, handleQuantityIncrease,handleQuantityDecrease}) => {
  return (
    <div className='flex gap-8 items-center'>
        {cartCounter ? null : <div className='font-semibold'>Quantitée</div>}
        <div className='flex gap-4 items-center text-base'>
            <button onClick={handleQuantityDecrease} className={btnStyles}> -</button>
            <div>{cartProduct.quantity}</div>
            <button onClick={handleQuantityIncrease} className={btnStyles}> +</button>
        </div>
    </div>
  )
}
