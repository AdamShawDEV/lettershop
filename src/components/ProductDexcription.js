import { useContext } from "react";
import { useParams } from "react-router-dom";
import useRequestData, { REQUEST_STATUS } from "./hooks/useRequestData";
import Loading from "./Loading";
import { CartContext } from './hooks/cartContext';

function ProductDescription() {
    const { id } = useParams();
    const { data, requestStatus } = useRequestData(id);
    const { setCart } = useContext(CartContext);

    function handleClick(e) {
        setCart((currentCart => {
            const itemAlreadyInCart = currentCart.find((i) =>
                i.id === data.id
            );
            if (itemAlreadyInCart) {
                return currentCart.map((i) =>
                    i.id === data.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...currentCart, {
                    id: data.id,
                    quantity: 1,
                }]
            }
        }));
    }

    if (requestStatus === REQUEST_STATUS.LOADING) return <Loading />;
    if (requestStatus === REQUEST_STATUS.ERROR) return <h1>Error</h1>;

    return (
        <div className='mx-auto bg-slate-300 w-3/4'>
            <div>
                <img src="http://placehold.jp/150.png" alt='product' />
            </div>
            <div className="p-2">
                <div className='flex justify-between items-center flex-wrap mb-2'>
                    <h2 className='text-lg text-black font-semibold'>{`${data.case[0].toUpperCase() + data.case.slice(1)}case ${data.name}`}</h2>
                    <small>$ {data.price}</small>
                </div>
                <div className="h-20 overflow-y-auto">
                    <p className="text-slate-500 font-medium">{data.description}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <button className='bg-blue-500 p-2 rounded-md hover:bg-blue-300 font-semibold'
                        onClick={(e) => handleClick(e)}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDescription;