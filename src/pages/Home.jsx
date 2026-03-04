import Footer from "../components/Footer.jsx";
import { Helmet } from 'react-helmet-async';
import { Testimonials } from "../components/Testimonials.jsx";
import BestSellers from "../components/BestSellers.jsx";
import Hero from "../components/Hero.jsx";
import Info from "../components/Info.jsx";
import CraftProcess from "../components/CraftProcess.jsx";
import ArtisanalCollections from "../components/ArtisanalCollections.jsx";

// Phase 4: New Premium Sections
import GiftingGuide from "../components/GiftingGuide.jsx";
import BespokeCommission from "../components/BespokeCommission.jsx";
import BehindTheArt from "../components/BehindTheArt.jsx";
import Loader from "../components/Loader.jsx";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

function Home() {
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    // Start minimum time timer for the cinematic loader
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!minTimePassed && <Loader key="loader" />}
      </AnimatePresence>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-notoSerif">
        <Helmet>
          <title>Gifting Tree | Premium Handmade Masterpieces</title>
          <meta name="description" content="Discover premium handcrafted resin products, customized gifts, and beautiful art pieces at Gifting Tree." />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Gifting Tree | Premium Handmade Masterpieces" />
          <meta property="og:description" content="Discover premium handcrafted resin products, customized gifts, and beautiful art pieces at Gifting Tree." />
          <meta property="og:url" content="https://gifting-tree.vercel.app/" />
          <meta property="og:image" content="https://gifting-tree.vercel.app/android-chrome-512x512.png" />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />
          <meta property="og:image:type" content="image/png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Gifting Tree | Premium Handmade Masterpieces" />
          <meta name="twitter:description" content="Discover premium handcrafted resin products, customized gifts, and beautiful art pieces at Gifting Tree." />
          <meta name="twitter:image" content="https://gifting-tree.vercel.app/android-chrome-512x512.png" />
          <script type="application/ld+json">
            {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Gifting Tree",
              "image": "https://gifting-tree.vercel.app/android-chrome-512x512.png",
              "@id": "https://gifting-tree.vercel.app/",
              "url": "https://gifting-tree.vercel.app/",
              "telephone": "+917001967279",
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "description": "Premium handcrafted resin products and customized gifts."
            }
          `}
          </script>
        </Helmet>

        {/* Hero Section */}
        <Hero />

        {/* Gifting Concierge Section */}
        <GiftingGuide />

        {/* ArtisanalCollections Section */}
        <ArtisanalCollections />

        {/* The Bespoke Experience Section */}
        <BespokeCommission />

        {/* Best Sellers Section */}
        <BestSellers />

        {/* Behind The Art Parallax Banner */}
        <BehindTheArt />

        {/* CraftProcess Section */}
        <CraftProcess />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Info Section */}
        <Info />

        {/* Footer Section */}
        <Footer />

      </div>
    </>
  );
}

export default Home;
