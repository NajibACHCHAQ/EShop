import { createContext, useContext, useState } from "react";

type CartContextType = {
    cartTotalQty:number;
}
export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName:string]:any;
}
export const CartContextProvider = (props:Props)=>{
    const[cartTotalQty,setCartTotalQty] = useState(10)
    const value = {
        cartTotalQty
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