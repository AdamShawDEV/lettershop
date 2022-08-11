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
                    <li className='inline-block pl-10'>
                        <Link className='text-white font-semibold text-lg p-2 rounded-lg hover:bg-slate-500' to="/cart" >cart {numItems() > 0 && `(${numItems()})`}</Link>
                    </li>
                    <li className='inline-block pl-10'>
                        <Link className='text-white font-semibold text-lg p-2 rounded-lg hover:bg-slate-500' to="/" >catalog</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;