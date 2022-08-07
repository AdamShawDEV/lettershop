import Product from "./Product";

function ProductList({ filteredProducts }) {
    return (
        <div className="flex flex-wrap p-2 gap-2">
            {filteredProducts.map((i) =>
                <Product key={i.id} product={i} />
            )}
        </div>
    );
}

export default ProductList