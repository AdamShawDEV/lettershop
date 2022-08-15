import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useRequestData, { REQUEST_STATUS } from "./hooks/useRequestData";
import Loading from "./Loading";
import { CartContext } from './hooks/cartContext';
import { useNavigate } from 'react-router-dom';
import utils from "./tools/utils";

function ProductDescription() {
    const { id } = useParams();
    const { data, requestStatus } = useRequestData(id);
    const { add } = useContext(CartContext);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    function handleClick(e) {
        add(id, quantity);

        navigate('/cart');
    }

    if (requestStatus === REQUEST_STATUS.LOADING) return <Loading />;
    if (!data) return <h1>Product not found!</h1>;
    if (requestStatus === REQUEST_STATUS.ERROR) return <h1>Error</h1>;

    const imgUrl = `../images/${data.family.replaceAll(' ', '-')}-${data.case}-${data.name}.png`;

    return (
        <div className='mx-auto bg-slate-300 max-w-6xl'>
            <div className="w-full flex justify-center">
                <img src={imgUrl} alt='product' />
            </div>
            <div className="p-2">
                <div className='flex justify-between items-center flex-wrap mb-2'>
                    <h2 className='text-3xl text-black font-semibold'>{`${data.case[0].toUpperCase() + data.case.slice(1)}case ${data.name}`}</h2>
                    <small className="font-semibold text-xl">$ {data.price}</small>
                </div>
                <div className="h-20 overflow-y-auto">
                    <p className="text-slate-500 font-medium">{data.description}</p>
                </div>
                <div className='text-right space-x-2'>
                    <label>Select quantity: </label>
                    <select value={quantity}
                        onChange={(e) => setQuantity(Number.parseInt(e.target.value))}>
                        {utils.range(1, 100).map((i) =>
                            <option key={i} value={i}>{i}</option>
                        )}
                    </select>
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