'use client'
// Importation des composants et modules nécessaires depuis le projet
import { Button } from '@/app/components/Button';
import { ProductImages } from '@/app/components/products/ProductImages';
import { SetColor } from '@/app/components/products/SetColor';
import { SetQuantity } from '@/app/components/products/SetQuantity';
import { useCart } from '@/hooks/useCart';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';

// Définition de l'interface pour les propriétés du composant ProductDetails
interface ProductDetailsProps {
    product: any; // Type générique pour le produit
}

// Définition des types pour les produits ajoutés au panier et les images sélectionnées
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

// Composant pour représenter une ligne horizontale
const Horizontal = () => {
    return <hr className='w-[30% my-2]' />;
};

// Composant principal ProductDetails
export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const {handleAddProductToCart, cartProducts} = useCart()
    const [isProductInCart, setIsProductInCart] = useState(false)
    // État local pour stocker le produit ajouté au panier
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        quantity: 1,
        price: product.price,
    });

    const router = useRouter()

    // Affichage des informations du produit ajouté au panier dans la console
    console.log(cartProduct);
    console.log(cartProducts)

    useEffect(()=>{
        setIsProductInCart(false)
        if(cartProducts){
            const existingIndex = cartProducts.findIndex((item)=> item.id === product.id)
            if(existingIndex > -1){
                setIsProductInCart(true)
            }
        }
    },[cartProducts])

    // Calcul de la note moyenne du produit à partir des avis
    const productRating =
        product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length;

    // Fonction de rappel pour mettre à jour la couleur sélectionnée du produit ajouté au panier
    const handleColorSelect = useCallback(
        (value: SelectedTypeImg) => {
            setCartProduct((prev) => {
                return { ...prev, selectedImg: value };
            });
        },
        [setCartProduct]
    );

    // Fonction de rappel pour augmenter la quantité du produit ajouté au panier
    const handleQuantityIncrease = useCallback(() => {
        if (cartProduct.quantity === 99) {
            return; // Limiter la quantité maximale à 99
        }
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity + 1 };
        });
    }, [cartProduct]);

    // Fonction de rappel pour diminuer la quantité du produit ajouté au panier
    const handleQuantityDecrease = useCallback(() => {
        setCartProduct((prev) => {
            // Limiter la quantité minimale à 1
            const newQuantity = prev.quantity - 1 > 1 ? prev.quantity - 1 : 1;
            return { ...prev, quantity: newQuantity };
        });
    }, [cartProduct]);

    // Rendu du composant ProductDetails
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {/* Composant pour afficher les images du produit */}
            <ProductImages cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect} />

            <div className='flex flex-col gap-1 text-slate-500 text-sm'>
                {/* Affichage du nom du produit */}
                <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>

                {/* Affichage de la note moyenne et du nombre d'avis */}
                <div className='flex items-center gap-2'>
                    <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} Avis</div>
                </div>

                {/* Ligne horizontale pour la séparation */}
                <Horizontal />

                {/* Affichage de la description du produit */}
                <div className='text-justify'>{product.description}</div>

                {/* Ligne horizontale pour la séparation */}
                <Horizontal />

                {/* Affichage de la catégorie du produit */}
                <div>
                    <span className='font-semibold'>CATEGORIE : </span>
                    {product.category}
                </div>

                {/* Affichage de la marque du produit */}
                <div>
                    <span className='font-semibold'>MARQUE : </span>
                    {product.brand}
                </div>

                {/* Affichage du statut de stock du produit */}
                <div className={product.stockQty > 0 ? 'text-teal-400 font-bold' : 'text-grey-400'}>
                    {product.stockQty > 0 ? 'En stock ' + product.stockQty : 'Rupture de stock'}
                </div>

                {/* Ligne horizontale pour la séparation */}
                <Horizontal />
                {isProductInCart ? <>
                    <p className='mb-2 text-slate-500 flex items-center gap-1'>
                        <MdCheckCircle className='text-teal-400' size={30}/>
                        <span>Le produit a été ajouté au panier</span>
                    </p>
                    <div className='max-w-[300px]'>
                        <Button label='Voir mon panier' outline onClick={()=>{
                            router.push("/cart");
                        } }/>
                    </div>
                </> : <>
                 {/* Composant pour sélectionner la couleur du produit */}
                {/* Assurez-vous d'utiliser la bonne propriété pour les images */}
                <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect} />

                {/* Ligne horizontale pour la séparation */}
                <Horizontal />

                {/* Composant pour définir la quantité du produit */}
                <SetQuantity
                    cartProduct={cartProduct}
                    handleQuantityDecrease={handleQuantityDecrease}
                    handleQuantityIncrease={handleQuantityIncrease}
                />

                {/* Ligne horizontale pour la séparation */}
                <Horizontal />

                {/* Bouton pour ajouter le produit au panier */}
                <div className='max-w-[300px]'>
                    <Button
                        label='Ajouter au panier'
                        onClick={() => {
                           handleAddProductToCart(cartProduct)
                        }}
                    />
                </div>
                
                </>}

               
            </div>
        </div>
    );
};
