'use client'

import { Button } from '@/app/components/Button';
import { ProductImages } from '@/app/components/products/ProductImages';
import { SetColor } from '@/app/components/products/SetColor'
import { SetQuantity } from '@/app/components/products/SetQuantity';
import { Rating } from '@mui/material'
import React, { useCallback, useState } from 'react'

interface ProductDetailsProps {
    product: any;
}

export type CartProductType = {
    id: string;
    name: string;
    description: string;
    brand: string;
    selectedImg: SelectedTypeImg;
    quantity: number;
    price: number;
};



export type SelectedTypeImg = {
    color: string;
    colorCode: string;
    image: string;
};

const Horizontal = () => {
    return <hr className='w-[30% my-2]' />;
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        quantity: 1,
        price: product.price,
    });
    console.log(cartProduct);

    const productRating =
        product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length;

    const handleColorSelect = useCallback(
        (value: SelectedTypeImg) => {
            setCartProduct((prev) => {
                return { ...prev, selectedImg: value };
            });
        },
        [setCartProduct]
    );
    const handleQuantityIncrease = useCallback(()=>{
        if(cartProduct.quantity ===99){
            return
        }
        setCartProduct((prev)=>{
            
            return {...prev, quantity: prev.quantity + 1 }
            
        })
    },[cartProduct])
    const handleQuantityDecrease = useCallback(()=>{
        setCartProduct((prev)=>{
            const newQuantity = prev.quantity - 1 > 1 ? prev.quantity - 1 : 1;
            return { ...prev, quantity: newQuantity };
        })
    },[cartProduct])

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            <ProductImages cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect}/>
            <div className='flex flex-col gap-1 text-slate-500 text-sm'>
                <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
                <div className='flex items-center gap-2'>
                    <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} Avis</div>
                </div>
                <Horizontal />
                <div className='text-justify'>{product.description}</div>
                <Horizontal />
                <div>
                    <span className='font-semibold'>CATEGORIE : </span>
                    {product.category}
                </div>
                <div>
                    <span className='font-semibold'>MARQUE : </span>
                    {product.brand}
                </div>
                <div className={product.inStock ? 'text-teal-400 font-bold' : 'text-grey-400'}>
                    {product.stockQty > 0 ? 'En stock ' + product.stockQty : 'Rupture de stock'}
                </div>
                <Horizontal />
                {/* Assurez-vous d'utiliser la bonne propriété pour les images */}
                <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect} />
                <Horizontal />
                <SetQuantity cartProduct={cartProduct} handleQuantityDecrease={handleQuantityDecrease} handleQuantityIncrease={handleQuantityIncrease}/>
                <Horizontal />
                <div className='max-w-[300px]'>
                    <Button
                    label='Ajouter au panier'
                    onClick={()=>{
                    }}
                    />
                </div>
            </div>
        </div>
    );
};
