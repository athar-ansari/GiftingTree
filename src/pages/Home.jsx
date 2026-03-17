import React, { useState, useEffect, Suspense, lazy } from "react";
import Footer from "../components/Footer.jsx";
import { Helmet } from 'react-helmet-async';
import Hero from "../components/Hero.jsx";
import SEO from "../components/SEO.jsx";
import FestiveCollection from "../components/FestiveCollection.jsx";
import Loader from "../components/Loader.jsx";
import { AnimatePresence } from "framer-motion";

// Lazy Loaded Components (Below the fold)
const GiftingGuide = lazy(() => import("../components/GiftingGuide.jsx"));
const ArtisanalCollections = lazy(() => import("../components/ArtisanalCollections.jsx"));
const BespokeCommission = lazy(() => import("../components/BespokeCommission.jsx"));
const BestSellers = lazy(() => import("../components/BestSellers.jsx"));
const BehindTheArt = lazy(() => import("../components/BehindTheArt.jsx"));
const CraftProcess = lazy(() => import("../components/CraftProcess.jsx"));
const Testimonials = lazy(() => import("../components/Testimonials.jsx"));
const InstagramLiveFeed = lazy(() => import("../components/InstagramLiveFeed.jsx"));
const Info = lazy(() => import("../components/Info.jsx"));

function Home() {
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    // Start minimum time timer for the cinematic loader
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!minTimePassed && <Loader key="loader" />}
      </AnimatePresence>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-notoSerif">
        <SEO 
          title="Premium Handmade Masterpieces"
          description="Discover premium handcrafted resin products, customized gifts, and beautiful art pieces at Gifting Tree."
          keywords="resin art, customized gifts, handmade products, wedding accessories, varmala preservation, resin frame, epoxy resin, custom keychain, gifting tree, India"
        />
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Gifting Tree",
              "url": "https://gifting-tree.vercel.app/",
              "description": "Premium handcrafted resin products, customized gifts, wedding accessories, varmala preservation, and personalized art pieces.",
              "publisher": { "@type": "Organization", "name": "Gifting Tree" }
            })}
          </script>
          <script type="application/ld+json">
            {`
        {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Gifting Tree",
              "image": "https://gifting-tree.vercel.app/og-preview.png",
              "@id": "https://gifting-tree.vercel.app/",
              "url": "https://gifting-tree.vercel.app/",
              "telephone": "+917001967279",
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "description": "Premium handcrafted resin products, customized gifts, wedding accessories, varmala preservation, and personalized art pieces at Gifting Tree.",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "21:00"
              }
            }
          `}
          </script>
        </Helmet>

        {/* Hero Section */}
        <Hero />

        {/* Dynamic Festive Collection */}
        <FestiveCollection />

        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-8 h-8 rounded-full border-4 border-[#1A2E1A]/20 border-t-[#1A2E1A] animate-spin"></div></div>}>
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

          {/* Instagram Post Showcase / Widget */}
          <InstagramLiveFeed />

          {/* Info Section */}
          <Info />

          {/* Footer Section */}
          <Footer />
        </Suspense>

      </div>
    </>
  );
}

export default Home;
