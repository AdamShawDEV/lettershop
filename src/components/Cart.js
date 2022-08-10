import { useContext, useState } from 'react';
import { CartContext } from './hooks/cartContext';
import useRequestData, { REQUEST_STATUS } from './hooks/useRequestData';
import Loading from "./Loading";
import { useNavigate } from 'react-router-dom';

function CartItem({ id, quantity, data, remove, changeQuantity }) {
    const [quantitySelect, setQuantitySelect] = useState(quantity);

    function handleQuantityChange(e) {
        const newQuantity = Number.parseInt(e.target.value);
        console.log(newQuantity);
        if (newQuantity === 0)
            remove();
        else {
            changeQuantity(id, newQuantity)
            setQuantitySelect(newQuantity);
        }
    }

    const imgUrl = `../images/${data.family.replaceAll(' ', '-')}-${data.case}-${data.name}.png`;

    return (
        <div className='rounded-lg overflow-hidden flex h-20 bg-slate-500'>
            <img className="" src={imgUrl} alt='product' />
            <div className="w-96 p-2">
                <h2 className="font-semibold" >{`${data.case[0].toUpperCase() + data.case.slice(1)}case ${data.name}`}</h2>
                <p>{data.family}</p>
            </div>
            <div className='flex items-center'>
                <label className='pr-2'>Quantity: </label>
                <select onChange={(e) => handleQuantityChange(e)} value={quantitySelect}>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                </select>
            </div>
            <small className='w-36 m-auto '>{`${data.price} x ${quantity} = $ ${(data.price * quantity).toFixed(2)}`}</small>
            <button className='bg-blue-500 p-1 rounded-md hover:bg-red-600 font-semibold self-start h-8 w-8' onClick={remove}>X</button>
        </div>
    );
}

function Cart() {
    const { cart, numItems, setCart } = useContext(CartContext);
    const { data, requestStatus } = useRequestData();
    const navigate = useNavigate();

    function deleteItem(id) {
        setCart((prev) =>
            prev.filter((i) =>
                i.id !== id
            )
        );
    }

    function changeQuantity(id, newQuantity) {
        setCart((prev) =>
            prev.map((i) => i.id === id ? { ...i, quantity: newQuantity } : i)
        );
    }

    if (requestStatus === REQUEST_STATUS.LOADING) return <Loading />;
    if (requestStatus === REQUEST_STATUS.ERROR) return <h1>Error...</h1>;

    // calculate total price of items in the cart
    const total = cart.reduce((prev, curr) => {
        const itemPrice = data.find((i) => i.id === curr.id).price;
        return prev + (curr.quantity * itemPrice);
    }, 0)

    return (
        <div className='p-2 lg:w-3/5 lg:mx-auto'>
            <h1 className='text-2xl font-semibold'>
                {`You have ${numItems()} item${numItems() > 1 ? 's' : ''} in your cart.`}
            </h1>
            <div className='space-y-2 py-2'>
                {cart.map((i) =>
                    <CartItem key={i.id} id={i.id} quantity={i.quantity}
                        data={data.find((d) => i.id === d.id)}
                        remove={() => deleteItem(i.id)}
                        changeQuantity={changeQuantity} />
                )}
            </div>
            <div className='border-t-2 border-slate-800 text-right font-semibold text-black text-2xl'>
                Total: $ {total.toFixed(2)}
                <button className='bg-blue-500 m-2 p-2 rounded-md hover:bg-blue-300 font-semibold disabled:bg-slate-700'
                    onClick={() => navigate("/checkout")}
                    disabled={!cart.length}>check out</button>
            </div>

        </div>

    );
}

export default Cart;