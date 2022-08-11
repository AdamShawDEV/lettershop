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

    return (
        <div className='w-full flex justify-center'>
            <h1 className='m-96 text-3xl'>Thanks for shopping! {remainingTime}</h1>
        </div>
    );
}

function Checkout() {
    const [address, setAddress] = useState(defaultAddressObject);
    const [formState, setFormState] = useState(FORM_STATE.IDLE);
    const { clearCart } = useContext(CartContext);
    const [fieldTouched, setFieldTouched] = useState({});

    const errors = checkForm();
    const isFormValid = Object.keys(errors).length === 0;

    function handleChange(e) {
        setAddress((curr) => {
            return { ...curr, [e.target.id]: e.target.value };
        });
    }

    function handleBlur(e) {
        setFieldTouched((curr) => {
            return { ...curr, [e.target.id]: true };
        });

    }

    function checkForm() {
        let output = {};
        if (!address.city) output.city = "City is a required.";
        if (!address.country) output.country = "Country is required";

        return output;
    }

    function handleSubmit(e) {
        e.preventDefault();

        setFormState(FORM_STATE.SUBMITTING);

        if (isFormValid) {
            clearCart();
            // save shipping address
            setFormState(FORM_STATE.COMPLETE);
        } else {
            setFormState(FORM_STATE.SUBMITTED);
        }
    }

    function handleClear(e) {
        e.preventDefault();

        setFieldTouched({});
        setAddress(defaultAddressObject);
        setFormState(FORM_STATE.IDLE);
    }

    if (formState === FORM_STATE.COMPLETE) return <ThanksMessage />

    return (
        <div className='w-full sm:mx-auto xl:w-2/5 sm:w-3/5 px-4'>
            <h1 className='text-2xl font-semibold'>Please fill in your address infomation.</h1>
            {!isFormValid && formState === FORM_STATE.SUBMITTED &&
                <div className='text-red-700 font-semibold text-xl'>
                    Please fix the following errors:
                    <ul>
                        {Object.keys(errors).map((i) =>
                            <li className='list-disc ml-4' key={i}>{errors[i]}</li>
                        )}
                    </ul>
                </div>
            }
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <label className='font-semibold'>City:</label>
                <p className='text-red-700'>
                    {(fieldTouched.city || formState === FORM_STATE.SUBMITTED) && errors.city}
                </p>
                <input type='text'
                    id='city'
                    value={address.city}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleBlur(e)} />
                <label className='font-semibold'>Country:</label>
                <p className='text-red-700'>
                    {(fieldTouched.country || formState === FORM_STATE.SUBMITTED) && errors.country}
                </p>
                <input type='text'
                    id='country'
                    value={address.country}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleBlur(e)} />
                <div>
                    <input className='bg-blue-500 m-2 p-2 rounded-md hover:bg-blue-300 font-semibold disabled:bg-slate-700 w-fit'
                        disabled={formState === FORM_STATE.SUBMITTING}
                        type='submit' value='Submit' />
                    <button className='hover:underline' onClick={(e) => handleClear(e)}>clear</button>
                </div>
            </form>
        </div>

    );
}

export default Checkout;