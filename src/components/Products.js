import ProductList from "./ProductList";
import Filter from "./Filter";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const tempData = [
  {
    id: 'ksdshdk8sd8sadasd8s',
    name: 'e',
    description: 'This is a great letter',
    price: 12.64,
    case: 'lower',
    family: 'comic-sands',
  },
  {
    id: 'shdkshdsdosd8os898s8d0',
    name: 'g',
    description: 'This is a great letter for having a good time',
    price: 24.95,
    case: 'upper',
    family: 'times new roman',
  },
  {
    id: 'jshd8sds9d89sd',
    name: 'w',
    description: 'This letter will do in the rain',
    price: 16.45,
    case: 'lower',
    family: 'wingdings',
  },
  {
    id: 'j98dso98a9sd80d',
    name: 's',
    description: 'Its slippyer than a snake',
    price: 12.64,
    case: 'lower',
    family: 'calibri',
  },
  {
    id: 'kjs8s8d9s8d9',
    name: 's',
    description: 'Its slippyer than a snake',
    price: 12.64,
    case: 'upper',
    family: 'bongo',
  },
  {
    id: 'sj8d89sa8d09sd8',
    name: 'l',
    description: 'Is it an i or is it a l you will have to tell us after you bought it',
    price: 7.99,
    case: 'upper',
    family: 'comic-sands',
  },
  {
    id: 'sd90s9ds909s8a0d8',
    name: 'f',
    description: 'You will find your best friend in this letter',
    price: 19.22,
    case: 'upper',
    family: 'bahnschrift',
  },
];

const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
}

function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);

  const availableLetters = products.reduce((array, current) => {
      if (!array.includes(current.name)) array.push(current.name);
      return array;
    }, []).sort((a, b) => a > b);
  const availableFamilies = products.reduce((array, current) => {
      if (!array.includes(current.family)) array.push(current.family);
      return array;
    }, []);
  const maxPrice = products.reduce((pre, cur) => Math.max(pre, Math.ceil(cur.price)), 0);

  useEffect(() => {
    try {
      setProducts(tempData);
      setRequestStatus(REQUEST_STATUS.SUCCESS);
    } catch(e) {
      setRequestStatus(REQUEST_STATUS.ERROR);
    }
  }, [])

  const filteredProducts = products.filter((i) => {
    return (!filters.selectedLetter || i.name === filters.selectedLetter) &&
      (!filters.selectedMaxPrice || i.price < filters.selectedMaxPrice) &&
      (!filters.selectedFamilies || filters.selectedFamilies.includes(i.family)) &&
      (!filters.selectedCase || i.case === filters.selectedCase);
  });

  if (requestStatus === REQUEST_STATUS.LOADING) return <Loading />

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