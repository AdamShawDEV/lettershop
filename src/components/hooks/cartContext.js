import { createContext, useState } from "react";

const CartContext = createContext();

function CartContextProvider({ children }) {
    const [cart, setCart] = useState([]);

    function numItems() {
        return cart.reduce((prev, curr) =>
            prev + curr.quantity
        , 0)
    }

    function clearCart() {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{cart, setCart, numItems, clearCart}}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartContextProvider };