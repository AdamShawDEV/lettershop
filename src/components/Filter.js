import { useState } from "react";

function Checkbox({ value, selectedFamilies, changeHandler }) {
    return (
        <>
            <div className="text-slate-600 font-normal" >
                <input className="w-5 h-5 rounded-lg"
                    id='selectedFamilies' type="checkbox" value={value} checked={selectedFamilies.includes(value)} onChange={(e) => changeHandler(e)} />
                {value}
            </div>
        </>
    );
}

function Filter({ setFilters, availableLetters, availableFamilies, maxPrice }) {
    const [formData, setFormData] = useState({
        selectedLetter: '',
        selectedMaxPrice: maxPrice,
        selectedFamilies: availableFamilies,
        selectedCase: '',
    });

    function changeHandler(e) {

        let newFilterData = null;

        if (e.target.id === 'selectedFamilies') {
            if (formData.selectedFamilies.includes(e.target.value)) {
                const newArray = formData.selectedFamilies.filter((i) => i !== e.target.value);
                newFilterData = { ...formData, selectedFamilies: newArray };
            } else {
                newFilterData = { ...formData, selectedFamilies: [...formData.selectedFamilies, e.target.value] };
            }
        } else {
            const newData = { ...formData, [e.target.id]: e.target.value };
            newFilterData = newData;
        }
        
        setFilters(newFilterData);
        setFormData(newFilterData);
    }

    return (
        <div className='w-52 p-2'>
            <h2 className="font-semibold text-xl" >Filter Letters</h2>
            <label className="block font-semibold text-lg">Select letter:</label>
            <select id='selectedLetter' className="block w-20 bg-slate-200 rounded-lg font-medium" value={formData.selectedLetter} onChange={(e) => changeHandler(e)}>
                <option value="">all</option>
                {availableLetters.map((i) => {
                    const letter = i.toLowerCase();
                    return <option key={letter} value={letter}>{letter}</option>
                })}
            </select>
            <label className="block font-semibold text-lg" >Select font families:</label>
            {availableFamilies.map((i) =>
                <Checkbox key={i} value={i} selectedFamilies={formData.selectedFamilies} changeHandler={changeHandler} />
            )}
            <label>Select case:</label>
            <select id='selectedCase' className="block w-20 bg-slate-200 rounded-lg font-medium" value={formData.selectedCase} onChange={(e) => changeHandler(e)}>
                <option value="">both</option>
                <option value='upper'>upper</option>
                <option value='lower'>lower</option>
            </select>
            <label className="block font-semibold text-lg" >Price:</label>
            range: 0 - {formData.selectedMaxPrice}
            <input id='selectedMaxPrice' type='range' min="0" max={maxPrice} value={formData.selectedMaxPrice} onChange={(e) => changeHandler(e)} />
        </div>
    );
}

export default Filter;