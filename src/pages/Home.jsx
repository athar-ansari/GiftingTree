import Footer from "../components/Footer.jsx";
import { Testimonials } from "../components/Testimonials.jsx";
import BestSellers from "../components/BestSellers.jsx";
import Hero from "../components/Hero.jsx";
import Info from "../components/Info.jsx";
import CraftProcess from "../components/CraftProcess.jsx";
import HandcraftedCollections from "../components/HandcraftedCollections.jsx";
import ArtisanalCollections from "../components/ArtisanalCollections.jsx";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-notoSerif">

      {/* Hero Section */}
      <Hero />

      {/* ArtisanalCollections Section */}
      <ArtisanalCollections />

      {/* Best Sellers Section */}
      <BestSellers />

      {/* CraftProcess Section */}
      <CraftProcess />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Info Section */}
      <Info />

      {/* Footer Section */}
      <Footer />

    </div>
  );
}

export default Home;
