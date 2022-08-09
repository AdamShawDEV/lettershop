import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './hooks/cartContext';

function Header() {
    const { numItems } = useContext(CartContext);

    return (
        <header className="p-2  bg-slate-600 flex items-center">
            <Link to="/" ><h1 className='text-3xl text-blue-400 font-semibold block'>The Letter Shop</h1></Link>
            <nav>
                <ul>
                    <li className='inline-block pl-2'>
                        <Link className='text-white font-semibold' to="/cart" >cart {numItems() > 0 && `(${numItems()})`}</Link>
                    </li>
                    <li className='inline-block pl-5'>
                        <Link className='text-white font-semibold' to="/" >letters</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;