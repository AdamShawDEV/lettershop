import ProductList from "./ProductList";
import Filter from "./Filter";
import { useState } from "react";
import Loading from "./Loading";
import useRequestData, { REQUEST_STATUS } from "./hooks/useRequestData";

function Products() {
  const [filters, setFilters] = useState({});
  const { data, requestStatus } = useRequestData();

  // if loading display loadind screen or if in error state display error
  if (requestStatus === REQUEST_STATUS.LOADING) return <Loading />;
  if (requestStatus === REQUEST_STATUS.ERROR) return <h1>Error...</h1>;

  const filteredProducts = data.filter((i) => {
    return (!filters.selectedLetter || i.name === filters.selectedLetter) &&
      (!filters.selectedMaxPrice || i.price < filters.selectedMaxPrice) &&
      (!filters.selectedFamilies || filters.selectedFamilies.includes(i.family)) &&
      (!filters.selectedCase || i.case === filters.selectedCase);
  });

  const availableLetters = data.reduce((array, current) => {
    if (!array.includes(current.name)) array.push(current.name);
    return array;
  }, []).sort((a, b) => a > b);
  const availableFamilies = data.reduce((array, current) => {
    if (!array.includes(current.family)) array.push(current.family);
    return array;
  }, []);
  const maxPrice = data.reduce((pre, cur) => Math.max(pre, Math.ceil(cur.price)), 0);

  return (
    <div className='flex'>
      <Filter
        availableLetters={availableLetters}
        availableFamilies={availableFamilies}
        maxPrice={maxPrice}
        setFilters={setFilters} />
      <ProductList filteredProducts={filteredProducts} />
    </div>
  );
}

export default Products;