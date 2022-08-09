import './App.css';
import Products from './components/Products';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import ProductDescription from './components/ProductDexcription';
import { CartContextProvider } from './components/hooks/cartContext';
import Checkout from './components/Checkout';

function App() {

  return (
    <CartContextProvider>
      <Router>
        <div className="min-h-full bg-slate-400">
          <Header />
          <main className="min-h-full w-full">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/Cart/" element={<Cart />} />
              <Route path="/description/:id" element={<ProductDescription />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartContextProvider>
  );
}

export default App;
