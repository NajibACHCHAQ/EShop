import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useState,useEffect } from "react";
import {toast} from 'react-hot-toast'
type CartContextType = {
    
    cartTotalQty:number;
    cartTotalAmount:number;
    cartProducts:CartProductType[] | null;
    handleAddProductToCart:(product:CartProductType)=>void;
    handleRemoveProductFromCart:(product:CartProductType)=>void;
    handleCartQtyIncrease:(product:CartProductType)=>void;
    handleCartQtyDecrease:(product:CartProductType)=>void;
    handleClearCart:(product:CartProductType)=>void;
    paymentIntent:string | null;
    handleSetPaymentIntent:(val:string | null ) => void;

   
}
export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName:string]:any;
}
export const CartContextProvider = (props:Props)=>{
    const[cartTotalQty,setCartTotalQty] = useState(0);   
    const [cartTotalAmount,setCartTotalAmount] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)
    const [paymentIntent, setPaymentInstant] = useState<string | null>(null)

    console.log('qty : ', cartTotalQty)
    console.log('amount : ', cartTotalAmount)


    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems');
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);
        const eShopPaymentIntent: any = localStorage.getItem('eShopPaymentIntent');
        let paymentIntent: string | null = null;
    
        try {
            // Assurez-vous que eShopPaymentIntent est une chaîne non nulle avant la conversion JSON
            if (eShopPaymentIntent) {
                paymentIntent = JSON.parse(eShopPaymentIntent);
            }
        } catch (error) {
            console.error("Erreur lors de la conversion JSON de eShopPaymentIntent :", error);
        }
    
        setCartProducts(cProducts);
        setPaymentInstant(paymentIntent);
    }, []);
    
    const handleAddProductToCart = useCallback((product: CartProductType)=>{
        setCartProducts((prev)=>{
            let updatedCart;
            if(prev){
                updatedCart = [...prev,product]
            }
            else{
                updatedCart =[product]
            }
            toast.success('produit ajouté au panier')
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
            return updatedCart
        });
    },[cartProducts])

    useEffect(() => {
        // La fonction getTotals est appelée à chaque changement dans cartProducts
        const getTotals = () => {
            if (cartProducts) {
                // Utilisation de reduce pour réunir tous les objets d'un tableau
                const { total, qty } = cartProducts?.reduce((acc, item) => {
                    // Calcul du montant total pour chaque produit (prix * quantité)
                    const itemTotal = item.price * item.quantity;
    
                    // Mise à jour de l'accumulateur avec les valeurs du produit actuel
                    // prix total du panier
                    acc.total += itemTotal;
                    // total produit panier
                    acc.qty += item.quantity;
    
                    // Retour de l'accumulateur mis à jour
                    return acc;
                }, {
                    total: 0,  // Valeur initiale du total
                    qty: 0    // Valeur initiale de la quantité
                });
    
                // Mise à jour des états avec les totaux calculés
                setCartTotalQty(qty);
                setCartTotalAmount(total);
            }
        }
    
        // Appel de la fonction pour calculer les totaux lors de chaque changement de cartProducts
        getTotals();
    }, [cartProducts]);
    

    const handleRemoveProductFromCart = useCallback((product: CartProductType)=>{
        // si cartProduct existe donc le panier n'est pas vide
        if(cartProducts){
            // Creation d'une fonction pour fltrer les produits dans le panier
            // et conserver uniquement les autres produit que celui cible
            const filteredProduct = cartProducts.filter((item)=>{
                // return le rest du panier
                return item.id !== product.id
            })
            // set le panier avec les produits restant
            setCartProducts(filteredProduct)
            toast.success('produit supprimer')
                // Stocker le panier dans le local storage
                localStorage.setItem('eShopCartItems', JSON.stringify(filteredProduct))
            }
        },
        [cartProducts]
    );

    const handleCartQtyIncrease = useCallback((product:CartProductType)=>{
        let updatedCart;
        if(product.quantity === 99){
            return alert('oops ! ')
        }
        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item)=> item.id === product.id)
            if(existingIndex > -1){
                updatedCart[existingIndex].quantity =
                ++updatedCart[existingIndex].quantity
            }
            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems',JSON.stringify(updatedCart))
        }
    }

    
    ,[cartProducts])

    const handleCartQtyDecrease = useCallback((product:CartProductType)=>{
        let updatedCart;
        if(product.quantity === 1){
            return alert('oops ! ')
        }
        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item)=> item.id === product.id)
            if(existingIndex > -1){
                updatedCart[existingIndex].quantity =
                --updatedCart[existingIndex].quantity
            }
            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems',JSON.stringify(updatedCart))
        }
    }
    ,[cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProducts(null);
        setCartTotalQty(0);
        localStorage.setItem("eShopCartItems", JSON.stringify(null));
      }, []);
      

    const handleSetPaymentIntent = useCallback((val:string | null)=>{
        setPaymentInstant(val)
        localStorage.setItem('eShopPaymentIntent',JSON.stringify(val))
    },[paymentIntent])

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent


    }
    return <CartContext.Provider value={value} {...props}/>
}

export const useCart = () =>{
    const context = useContext(CartContext)

    if(context === null){
        throw new Error("use must be used within a CartContextProvider")
    }
    return context
}