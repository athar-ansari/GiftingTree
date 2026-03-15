import Footer from "../components/Footer.jsx";
import { Helmet } from 'react-helmet-async';
import { Testimonials } from "../components/Testimonials.jsx";
import BestSellers from "../components/BestSellers.jsx";
import Hero from "../components/Hero.jsx";
import Info from "../components/Info.jsx";
import CraftProcess from "../components/CraftProcess.jsx";
import ArtisanalCollections from "../components/ArtisanalCollections.jsx";

import SEO from "../components/SEO.jsx";
// Phase 4: New Premium Sections
import FestiveCollection from "../components/FestiveCollection.jsx";
import GiftingGuide from "../components/GiftingGuide.jsx";
import BespokeCommission from "../components/BespokeCommission.jsx";
import BehindTheArt from "../components/BehindTheArt.jsx";
import Loader from "../components/Loader.jsx";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

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
