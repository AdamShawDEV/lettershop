import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './hooks/cartContext';

function Product({ product }) {
    const { add } = useContext(CartContext);
    const navigate = useNavigate();

    function handleAddButton(e) {
        e.stopPropagation();

        add(product.id);
    }

    function onClick(e) {
        e.stopPropagation();
        navigate(`/description/${product.id}`);
    }

    const imgUrl = `../images/${product.family.replaceAll(' ', '-')}-${product.case}-${product.name}.png`;

    return (
        <div className='w-56 overflow-hidden bg-slate-300 rounded-xl h-fit hover:scale-105 hover:shadow-2xl cursor-pointer'
        onClick={(e) => onClick(e)}>
            <div>
                <img className="w-full" src={imgUrl} alt='product' />
            </div>
            <div className="p-2">
                <div className='flex justify-between items-center flex-wrap mb-2'>
                    <h2 className='text-lg text-black font-semibold'>{`${product.case[0].toUpperCase() + product.case.slice(1)}case ${product.name}`}</h2>
                    <small>$ {product.price}</small>
                </div>
                <div className='flex justify-between items-center'>
                    <button className='bg-blue-500 p-2 rounded-md hover:bg-blue-300 font-semibold'
                        onClick={(e) => handleAddButton(e)}>
                        Add to cart
                    </button>
                    <Link className='mx-auto hover:underline' to={`/description/${product.id}`} >more info</Link>
                </div>
            </div>
        </div>
    );
}

export default Product;