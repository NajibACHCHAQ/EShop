'use client'
// Importations des modules nécessaires
'use client'
import { CartProductType, SelectedTypeImg } from '@/app/product/[productId]/ProductDetails'
import React from 'react'
import Image from 'next/image'

// Définition des types pour les propriétés du composant
interface ProductImagesProps {
    cartProduct: CartProductType;
    product: any; // Assurez-vous de spécifier un type plus précis si possible
    handleColorSelect: (value: SelectedTypeImg) => void;
}

// Composant ProductImages
export const ProductImages: React.FC<ProductImagesProps> = (
    { cartProduct, product, handleColorSelect }
) => {
    return (
        <div className='grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]'>
            {/* Section des miniatures */}
            <div className='flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]'>
                {product.images.map((image: SelectedTypeImg) => {
                    return (
                        <div
                            key={image.color}
                            onClick={() => handleColorSelect(image)}
                            className={`relative w-[80%] aspect-square rounded border-teal-300 
                                ${cartProduct.selectedImg.color === image.color ? 'border' : 'border-none'}`}
                        >
                            {/* Utilisation de la balise Image de Next.js pour l'optimisation des images */}
                            <Image src={image.image} alt={image.color} fill className="object-contain" />
                        </div>
                    );
                })}
            </div>
            {/* Section de l'image principale */}
            <div className='col-span-5 relative aspect-square'>
                {/* Utilisation de la balise Image de Next.js pour l'optimisation des images */}
                <Image src={cartProduct.selectedImg.image} fill className="w-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]" alt={cartProduct.name} />
            </div>
        </div>
    );
};
