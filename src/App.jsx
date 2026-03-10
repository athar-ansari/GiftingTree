import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ResinProducts from './pages/ResinProducts';
import FestivalProducts from './pages/FestivalProducts';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import { useLocation } from 'react-router-dom';

const AppContent = () => {
  const location = useLocation();
  const hideControls = location.pathname.startsWith('/product/') || location.pathname.startsWith('/festival');

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
    <>
      <ScrollToTop />
      <Toaster position="top-center" />
      {!hideControls && <Navbar />}
      {!hideControls && <FloatingWhatsApp />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resin-products" element={<ResinProducts />} />
        <Route path="/festival" element={<FestivalProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
