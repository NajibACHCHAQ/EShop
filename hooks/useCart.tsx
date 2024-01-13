import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { product } from "@/utils/product";
import { createContext, useCallback, useContext, useState,useEffect } from "react";

type CartContextType = {
    cartTotalQty:number;
    cartProducts:CartProductType[] | null;
    handleAddProductToCart:(product:CartProductType)=>void;
    //handleRemoveProductFromCart:()=>void;

}
export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName:string]:any;
}
export const CartContextProvider = (props:Props)=>{
    const[cartTotalQty,setCartTotalQty] = useState(10)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)
    useEffect(()=>{
        const cartItems: any = localStorage.getItem('eShopCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)

        setCartProducts(cProducts)

    },[])
    const handleAddProductToCart = useCallback((product: CartProductType)=>{
        setCartProducts((prev)=>{
            let updatedCart;
            if(prev){
                updatedCart = [...prev,product]
            }
            else{
                updatedCart =[product]
            }
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
            return updatedCart
        });
    },[])
    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
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