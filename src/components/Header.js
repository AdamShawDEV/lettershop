import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './hooks/cartContext';

function Header() {
    const { cart } = useContext(CartContext);

    return (
        <header className="p-2  bg-slate-600">
            <Link to="/" ><h1 className='text-3xl text-white font-semibold'>The Letter Shop</h1></Link>
            <nav>
                <ul>
                    <li>
                        <Link to="/cart" >cart {cart.length > 0 && `(${cart.length})`}</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;