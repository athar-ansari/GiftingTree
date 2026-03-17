import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
import PageTransition from "./components/PageTransition";

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const ResinProducts = lazy(() => import('./pages/ResinProducts'));
const FestivalProducts = lazy(() => import('./pages/FestivalProducts'));

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
      <AnimatePresence mode="wait">
        <Suspense fallback={<Loader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/resin-products" element={<PageTransition><ResinProducts /></PageTransition>} />
            <Route path="/festival" element={<PageTransition><FestivalProducts /></PageTransition>} />
            <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
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
