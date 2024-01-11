'use client'

import { Rating } from '@mui/material'
import React from 'react'
interface ProductDetailsProps{
    product:any
}

const Horizontal =()=>{
    return<hr className='w-[30% my-2]'/>
}
export const ProductDetails:React.FC<ProductDetailsProps> = ({product}) => {
    const productRating = product.reviews.reduce((acc:number,item:any) => item.rating + acc,0) / product.reviews.length;
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        <div>Images</div>
        <div className='flex flex-col gap-1 text-slate-500 text-sm'>
            <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
            <div className='flex items-center gap-2'>
                <Rating value={productRating} readOnly/>
                <div>{product.reviews.length} Avis</div>
            </div>
            <Horizontal/>          
            <div className='text-justify'>{product.description}</div>
            <Horizontal/>
            <div>
                <span className='font-semibold'>CATEGORIE : </span>{product.category}
            </div>
            <div>
                <span className='font-semibold'>MARQUE : </span>{product.BRAND}
            </div>
            <div>
                {/* {product.inStock ? 'En stock' : 'Rupture de stock'} */}
                {product.quantity >0 ? 'En stock ' + product.quantity : 'Rupture de stock'}
            </div>
        </div>
    </div>
  )
}
