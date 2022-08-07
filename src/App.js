import './App.css';
import Products from './components/Products';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import ProductDescription from './components/ProductDexcription';
import { CartContextProvider } from './components/hooks/cartContext';

function App() {

  return (
    <CartContextProvider>
      <Router>
        <div className="min-h-full bg-slate-400">
          <Header />
          <main className="bg-slate-400 min-h-full">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/Cart/" element={<Cart />} />
              <Route path="/:family/:case/:letter" element={<ProductDescription />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartContextProvider>
  );
}

export default App;
