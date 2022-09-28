import { Route, Routes } from "react-router-dom";
import { ProductsPage } from './pages/ProductsPage';
import { ProductPage } from './pages/ProductPage';

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </>  
  );
}

export default App;
