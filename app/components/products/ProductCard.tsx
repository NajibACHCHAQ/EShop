'use client'
// Importations des modules nécessaires
'use client'
import React from 'react'
import Image from 'next/image'
import { truncateText } from '@/utils/truncateText'
import { formatPrice } from '@/utils/formatPrice'
import { Rating } from '@mui/material'
import { useRouter } from 'next/navigation'

// Définition des types pour les propriétés du composant
interface ProductCardProps {
  data: any; // Assurez-vous de spécifier un type plus précis si possible
}

// Composant ProductCard
export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  // Utilisation du hook useRouter de Next.js pour la navigation
  const router = useRouter()

  // Calcul de la note moyenne du produit
  const productRating = data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / data.reviews.length;

  console.log(productRating);

  return (
    // Gestion du clic sur la carte pour rediriger vers la page du produit
    <div onClick={() => router.push(`/product/${data.id}`)} className='col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition:scale-105 text-center text-sm'>
      <div className='flex flex-col items-center w-full gap-1'>
        <div className='aspect-square overflow-hidden relative w-full'>
          <Image fill src={data.images[0].image} className='w-full h-full object-contain' alt={data.name} />
        </div>
        <div className='mt-4'>
          {truncateText(data.name)}
        </div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>
          {data.reviews.length} Avis
        </div>
        <div className='font-semibold'>
          {formatPrice(data.price)}
        </div>
      </div>
    </div>
  );
};
