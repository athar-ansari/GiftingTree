import Footer from "../components/Footer.jsx";
import { Helmet } from 'react-helmet-async';
import { Testimonials } from "../components/Testimonials.jsx";
import BestSellers from "../components/BestSellers.jsx";
import Hero from "../components/Hero.jsx";
import Info from "../components/Info.jsx";
import CraftProcess from "../components/CraftProcess.jsx";
import ArtisanalCollections from "../components/ArtisanalCollections.jsx";

// Phase 4: New Premium Sections
import FestiveCollection from "../components/FestiveCollection.jsx";
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
    }, 2500);

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
          <link rel="canonical" href="https://gifting-tree.vercel.app/" />
          <meta name="keywords" content="resin art, customized gifts, handmade products, wedding accessories, varmala preservation, resin frame, epoxy resin, custom keychain, gifting tree, India" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Gifting Tree | Premium Handmade Masterpieces" />
          <meta property="og:description" content="Discover premium handcrafted resin products, customized gifts, and beautiful art pieces at Gifting Tree." />
          <meta property="og:url" content="https://gifting-tree.vercel.app/" />
          <meta property="og:image" content="https://gifting-tree.vercel.app/android-chrome-512x512.png" />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:locale" content="en_IN" />
          <meta property="og:site_name" content="Gifting Tree" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Gifting Tree | Premium Handmade Masterpieces" />
          <meta name="twitter:description" content="Discover premium handcrafted resin products, customized gifts, and beautiful art pieces at Gifting Tree." />
          <meta name="twitter:image" content="https://gifting-tree.vercel.app/android-chrome-512x512.png" />
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
              "image": "https://gifting-tree.vercel.app/android-chrome-512x512.png",
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
