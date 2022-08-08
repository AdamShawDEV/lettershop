import { useContext } from 'react';
import { CartContext } from './hooks/cartContext';

function Cart() {
    const { cart } = useContext(CartContext);

    return (
        <h1>
            Cart {cart.length > 0 && `(${cart.length})`}
        </h1>
    );
}

export default Cart;