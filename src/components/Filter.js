import { useState } from "react";

function Checkbox({ value, selectedFamilies, changeHandler }) {

    return (
        <>
            <div className="text-slate-600 font-normal" >
                <input className="w-5 h-5 rounded-lg"
                    id='family' type="checkbox" value={value} checked={selectedFamilies.includes(value)} onChange={(e) => changeHandler(e)} />
                {value}
            </div>
        </>
    );
}

function Filter({ setFilters, availableLetters, availableFamilies, maxPrice }) {
    const [selectedLetter, setSelectedLetter] = useState("");
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(maxPrice);
    const [selectedFamilies, setSelectedFamilies] = useState(availableFamilies);
    const [selectedCase, setSelectedCase] = useState("");

    function changeHandler(e) {

        let filters = {};

        switch (e.target.id) {
            case 'letter':
                setSelectedLetter(e.target.value);
                filters = {
                    selectedLetter: e.target.value,
                    selectedMaxPrice,
                    selectedFamilies,
                    selectedCase,
                };
                break;
            case 'family':
                let newSelectedFamily = [];
                if (!selectedFamilies.includes(e.target.value)) {
                    newSelectedFamily = [...selectedFamilies, e.target.value];
                    setSelectedFamilies(newSelectedFamily);
                } else {
                    newSelectedFamily = selectedFamilies.filter((i) =>
                        i !== e.target.value
                    );
                    setSelectedFamilies(newSelectedFamily);
                }
                filters = {
                    selectedLetter,
                    selectedMaxPrice,
                    selectedFamilies: newSelectedFamily,
                    selectedCase,
                };
                break;
            case 'case':
                filters = {
                    selectedLetter,
                    selectedMaxPrice,
                    selectedFamilies,
                    selectedCase: e.target.value,
                };
                setSelectedCase(e.target.value);
                break;
            case 'price':
                filters = {
                    selectedLetter,
                    selectedMaxPrice: e.target.value,
                    selectedFamilies,
                    selectedCase,
                };
                setSelectedMaxPrice(e.target.value);
                break;
            default:
                break;

        } 

        setFilters(filters);
    }

    return (
        <div className='w-52 p-2'>
            <h2 className="font-semibold text-xl" >Filter Letters</h2>
            <label className="block font-semibold text-lg">Select letter:</label>
            <select id='letter' className="block w-20 bg-slate-200 rounded-lg font-medium" value={selectedLetter} onChange={(e) => changeHandler(e)}>
                <option value="">all</option>
                {availableLetters.map((i) => {
                    const letter = i.toLowerCase();
                    return <option key={letter} value={letter}>{letter}</option>
                })}
            </select>
            <label className="block font-semibold text-lg" >Select font families:</label>
            {availableFamilies.map((i) =>
                <Checkbox key={i} value={i} selectedFamilies={selectedFamilies} changeHandler={changeHandler} />
            )}
            <label>Select case:</label>
            <select id='case' className="block w-20 bg-slate-200 rounded-lg font-medium" value={selectedCase} onChange={(e) => changeHandler(e)}>
                <option value="">both</option>
                <option value='upper'>upper</option>
                <option value='lower'>lower</option>
            </select>
            <label className="block font-semibold text-lg" >Price:</label>
            range: 0 - {selectedMaxPrice}
            <input id='price' type='range' min="0" max={maxPrice} value={selectedMaxPrice} onChange={(e) => changeHandler(e)} />
        </div>
    );
}

export default Filter;