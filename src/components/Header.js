import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="p-2  bg-slate-600">
            <Link to="/" ><h1 className='text-3xl text-white font-semibold'>The Letter Shop</h1></Link>
            <nav>
                <ul>
                    <li>
                        <Link to="/cart">cart</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;