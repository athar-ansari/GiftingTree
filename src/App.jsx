import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ResinProducts from './pages/ResinProducts';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { Toaster } from 'react-hot-toast';

function App() {

  useEffect(() => {
    let docTitle = document.title;

    const onBlur = () => {
      document.title = "Come Back";
    };

    const onFocus = () => {
      document.title = docTitle;
    };

    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return (
    <Router>
      <Toaster position="top-center" />
      <Navbar />
      <FloatingWhatsApp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resin-products" element={<ResinProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
