import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Images
import Resin from "../assets/resin.jpg";
import Wedding from "../assets/wedding.jpg";

const collections = [
  {
    id: "resin-wonders",
    title: "Resin Wonders",
    description: "Transform moments into timeless art pieces",
    image: Resin,
    categories: [
      "Key chains", "Jewelry", "Birthday frame", "Couple frame", "Religious frame",
      "Car accessories", "Clock", "Bookmarks", "Puja thali", "Wall art",
      "Book holder", "Flower preservation"
    ]
  },
  {
    id: "wedding-elegance",
    title: "Wedding Elegance",
    description: "Elevate your special day with handcrafted beauty",
    image: Wedding,
    categories: [
      "Pen", "Mirror", "Dupatta", "Register", "Thumb frame", "Nikah frame",
      "Wedding Boards", "Nikah favours", "Mehar box", "Platter"
    ]
  }
];

export default function ArtisanalCollections() {
  const [activeCollection, setActiveCollection] = useState(collections[0].id);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveCollection(prev =>
          prev === collections[0].id ? collections[1].id : collections[0].id
        );
      }
    }, 9000);

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section
      ref={containerRef}
      className="py-12 md:py-24 bg-white overflow-hidden font-notoSerif"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6  text-indigo-700  text-center font-lora  ">
            Our Artisanal Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-xl -mt-2">
            Discover the perfect blend of tradition and modernity in our handcrafted masterpieces
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex justify-center space-x-4 mb-8">
            {collections.map((collection) => (
              <Button
                key={collection.id}
                variant={activeCollection === collection.id ? "default" : "outline"}
                className={`text-sm md:text-lg px-4 md:px-8 py-2 md:py-4 rounded-full transition-all duration-300 ${activeCollection === collection.id
                  ? 'bg-indigo-700 text-white hover:bg-indigo-700 shadow-lg scale-105'
                  : 'text-indigo-700 hover:bg-white'
                  }`}
                onClick={() => setActiveCollection(collection.id)}
              >
                {collection.title}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {collections.map((collection) => (
              collection.id === activeCollection && (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <CollectionShowcase collection={collection} />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function CollectionShowcase({ collection }) {
  return (
    <Card className="overflow-hidden shadow-2xl rounded-3xl">
      <CardContent className="p-0">
        <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
          <img
            src={collection.image}
            alt={collection.title}
            style={{ objectFit: 'cover' }}
            className="w-full h-full transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 p-4 md:p-12 text-white w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-6">{collection.title}</h3>
            <p className="text-lg md:text-2xl mb-4 md:mb-8 max-w-2xl">{collection.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
              {collection.categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <CategoryButton category={category} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryButton({ category }) {
  return (
    <Link to={`/products?category=${encodeURIComponent(category.toLowerCase().replace(/ /g, '-'))}`}>
      <Button
        variant="outline"
        className="w-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-white/20 rounded-xl py-2 md:py-4 text-xs md:text-sm lg:text-base transition-all duration-300 hover:shadow-lg group"
      >
        <span className="flex items-center gap-1 md:gap-2 justify-between">
          {category}
        </span>
      </Button>
    </Link>
  );
}
