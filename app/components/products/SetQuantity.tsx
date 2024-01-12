// Importations des modules nécessaires
'use client'
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import { dividerClasses } from '@mui/material';
import React from 'react';

// Définition des types pour les propriétés du composant
interface SetQuantityProps {
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQuantityIncrease: () => void;
    handleQuantityDecrease: () => void;
}

// Styles pour les boutons
const btnStyles = 'pr-2 pl-2 border-[1.2px] border-slate-300';

// Composant SetQuantity
export const SetQuantity: React.FC<SetQuantityProps> = ({
    cartCounter,
    cartProduct,
    handleQuantityIncrease,
    handleQuantityDecrease,
}) => {
    return (
        <div className='flex gap-8 items-center'>
            {cartCounter ? null : <div className='font-semibold'>Quantité</div>}
            <div className='flex gap-4 items-center text-base'>
                <button onClick={handleQuantityDecrease} className={btnStyles}>
                    {' '}
                    -{' '}
                </button>
                <div>{cartProduct.quantity}</div>
                <button onClick={handleQuantityIncrease} className={btnStyles}>
                    {' '}
                    +{' '}
                </button>
            </div>
        </div>
    );
};
