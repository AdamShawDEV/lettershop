import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './hooks/cartContext';

function Product({ product }) {
    const { setCart } = useContext(CartContext);

    function handleClick(e) {
        setCart((currentCart => {
            const itemAlreadyInCart = currentCart.find((i) =>
                i.id === product.id
            );
            if (itemAlreadyInCart) {
                return currentCart.map((i) =>
                    i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...currentCart, {
                    id: product.id,
                    quantity: 1,
                }]
            }
        }));
    }

    return (
        <div className='w-56 overflow-hidden bg-slate-300 rounded-xl h-fit'>
            <div>
                <img className="w-full" src="http://placehold.jp/150.png" alt='product' />
            </div>
            <div className="p-2">
                <div className='flex justify-between items-center flex-wrap mb-2'>
                    <h2 className='text-lg text-black font-semibold'>{`${product.case[0].toUpperCase() + product.case.slice(1)}case ${product.name}`}</h2>
                    <small>$ {product.price}</small>
                </div>
                {/* <div className="h-20 overflow-y-auto">
                    <p className="text-slate-500 font-medium">{product.description}</p>
                </div> */}
                <div className='flex justify-between items-center'>
                    <button className='bg-blue-500 p-2 rounded-md hover:bg-blue-300 font-semibold'
                        onClick={(e) => handleClick(e)}>
                        Add to cart
                    </button>
                    <Link className='mx-auto hover:underline' to={`/${product.family.replaceAll(' ', '-')}/${product.case}/${product.name}`} >more info</Link>
                </div>
            </div>
        </div>
    );
}

export default Product;