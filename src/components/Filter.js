import { useEffect, useState } from "react";
import Loading from './Loading';

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

function Filter({ setFilters, filters, availableLetters, availableFamilies, maxPrice }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setFilters({
            selectedLetter: '',
            selectedMaxPrice: maxPrice,
            selectedFamilies: availableFamilies,
            selectedCase: '',
        });
        setLoading(false);
    }, []);

    function changeHandler(e) {
        setFilters((current) => {
            if (e.target.id === 'selectedFamilies') {
                if (current.selectedFamilies.includes(e.target.value)) {
                    const newArray = current.selectedFamilies.filter((i) => i != e.target.value);
                    return { ...current, selectedFamilies: newArray };
                } else {
                    return { ...current, selectedFamilies: [...current.selectedFamilies, e.target.value] };
                }
            } else {
                return { ...current, [e.target.id]: e.target.value };
            }
        });
    }

    if (loading) return <Loading />;

    return (
        <div className='w-52 p-2'>
            <h2 className="font-semibold text-xl" >Filter Letters</h2>
            <label className="block font-semibold text-lg">Select letter:</label>
            <select id='selectedLetter'
                className="block w-20 bg-slate-200 rounded-lg font-medium"
                value={filters.selectedLetter}
                onChange={(e) => changeHandler(e)}>
                <option value="">all</option>
                {availableLetters.map((i) => {
                    const letter = i.toLowerCase();
                    return <option key={letter} value={letter}>{letter}</option>
                })}
            </select>
            <label className="block font-semibold text-lg" >Select font families:</label>
            {availableFamilies.map((i) =>
                <Checkbox key={i} value={i} selectedFamilies={filters.selectedFamilies} changeHandler={changeHandler} />
            )}
            <label>Select case:</label>
            <select id='selectedCase'
                className="block w-20 bg-slate-200 rounded-lg font-medium"
                value={filters.selectedCase}
                onChange={(e) => changeHandler(e)}>
                <option value="">both</option>
                <option value='upper'>upper</option>
                <option value='lower'>lower</option>
            </select>
            <label className="block font-semibold text-lg" >Price:</label>
            range: 0 - {filters.selectedMaxPrice}
            <input id='selectedMaxPrice' type='range' min="0" max={maxPrice} value={filters.selectedMaxPrice} onChange={(e) => changeHandler(e)} />
        </div>
    );
}

export default Filter;