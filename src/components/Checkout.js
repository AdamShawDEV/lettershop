import { useContext, useEffect, useState } from 'react';
import { CartContext } from './hooks/cartContext';
import { useNavigate } from 'react-router-dom';

const defaultAddressObject = {
    city: "",
    country: "",
};

const FORM_STATE = {
    IDLE: 'idle',
    SUBMITTING: 'submitting',
    SUBMITTED: 'submitted',
    COMPLETE: 'complete',
};

function ThanksMessage() {
    const navigate = useNavigate();
    const [remainingTime, setRemainingTime] = useState(5);

    useEffect(() => {
        if (remainingTime > 0) {
            const unsub = setTimeout(() =>
                setRemainingTime((curr) => curr - 1
                ), 1000);

            return () => clearTimeout(unsub);
        }
        else {
            navigate('/');
        }
    }, [remainingTime]);

    return <h1>Thanks for shopping! {remainingTime}</h1>;
}

function Checkout() {
    const [address, setAddress] = useState(defaultAddressObject);
    const [error, setError] = useState({});
    const [formState, setFormState] = useState(FORM_STATE.IDLE);
    const { clearCart } = useContext(CartContext);

    function handleChange(e) {
        setAddress((curr) => {
            return { ...curr, [e.target.id]: e.target.value };
        });

        if (!e.target.value) {
            setError((curr) => {
                return { ...curr, [e.target.id]: `Invalid ${e.target.id}` };
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        setFormState(FORM_STATE.SUBMITTING);

        if (!Object.keys(error).length) {
            clearCart();
            setFormState(FORM_STATE.COMPLETE);
        }
    }

    if (formState === FORM_STATE.COMPLETE) return <ThanksMessage />

    return (
        <div>
            <h1>Please fill in your address infomation.</h1>
            {formState === FORM_STATE.SUBMITTING && Object.keys(error).length > 0 &&
                <div>
                    Please fix the following errors:
                    <ul>
                        {Object.keys(error).map((i) =>
                            <li key={i}>{error[i]}</li>
                        )}
                    </ul>
                </div>
            }
            <form onSubmit={handleSubmit} className='flex flex-col '>
                <label>City:</label>
                <input type='text'
                    id='city'
                    value={address.city}
                    onChange={(e) => handleChange(e)} />
                <label>Country:</label>
                <input type='text'
                    id='country'
                    value={address.country}
                    onChange={(e) => handleChange(e)} />
                <input type='submit' value='Submit' />
            </form>
        </div>

    );
}

export default Checkout;