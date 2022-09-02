import { createContext, useState } from "react";

const CartContext = createContext();

function CartContextProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('cart')) ?? [];
        } catch {
            console.log('Unable to parse cart from local storage');
            return [];
        }
    });

    function numItems() {
        return cart.reduce((prev, curr) =>
            prev + curr.quantity
            , 0)
    }

    function deleteItem(id) {
        setCart((currentCart) => {
            const newCart = currentCart.filter((i) =>
                i.id !== id);

            localStorage.cart = JSON.stringify(newCart);
            return newCart;
        })
    }

    function update(id, updatedQuantity) {
        setCart((currentCart) => {
            const newCart = currentCart.map((i) =>
                i.id === id ? { ...i, quantity: updatedQuantity } : i);

            localStorage.cart = JSON.stringify(newCart);
            return newCart;
        })
    }

    function clearCart() {
        localStorage.removeItem('cart');
        setCart([]);
    }

    function add(id, quantityToAdd = 1) {
        setCart((currentCart => {
            const itemAlreadyInCart = currentCart.find((i) =>
                i.id === id
            );

            let newCart = [];
            if (itemAlreadyInCart) {
                newCart = currentCart.map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity + quantityToAdd } : i
                );
            } else {
                newCart = [...currentCart, {
                    id: id,
                    quantity: quantityToAdd,
                }];
            }

            localStorage.cart = JSON.stringify(newCart);
            return newCart;
        }));
    }

    return (
        <CartContext.Provider value={{ cart, add, setCart, numItems, clearCart, update, deleteItem }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartContextProvider };