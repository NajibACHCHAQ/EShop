'use client'


import { CartProductType, SelectedTypeImg } from '@/app/product/[productId]/ProductDetails'
import React from 'react'
import Image from 'next/image'

interface ProductImagesProps{
    cartProduct:CartProductType,
    product:any,
    handleColorSelect:(value:SelectedTypeImg) => void;
}
export const ProductImages:React.FC<ProductImagesProps> = (
    {cartProduct,
    product,
    handleColorSelect}
) => {
  return (
    <div className='grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]'>
        <div className='flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]'>
            {product.images.map((image:SelectedTypeImg)=>{
                return <div key={image.color} onAuxClick={()=> handleColorSelect(image)} 
                className={`relative w-[80%] aspect-square rounded border-teal-300 
                ${cartProduct.selectedImg.color === image.color ? 'border' : 'border-none'}`}>
                    <Image src={image.image} alt={image.color} fill className="object-contain " />
                </div>
            })}
        </div>
        <div className='col-span-5 relative aspect-square'>
            <Image src={cartProduct.selectedImg.image} fill className="w-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px] " alt={cartProduct.name}   />
        </div>
    </div>
  )
}
