import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";

// Images
import weddingCardImage from "../assets/material.gif";
import photoFrameImage from "../assets/material.gif";
import haldiBoardImage from "../assets/material.gif";
import nikahSetImage from "../assets/material.gif";
import birthdayFrameImage from "../assets/material.gif";
import marriageFrameImage from "../assets/material.gif";

const categories = [
  {
    title: "Wedding Cards",
    description: "Elegant invitations for your special day",
    image: weddingCardImage,
  },
  {
    title: "Photo Frames",
    description: "Preserve your memories in style",
    image: photoFrameImage,
  },
  {
    title: "Haldi Board",
    description: "Traditional designs for joyous ceremonies",
    image: haldiBoardImage,
  },
  {
    title: "Nikah Sets",
    description: "Complete collections for sacred unions",
    image: nikahSetImage,
  },
  {
    title: "Birthday Frames",
    description: "Celebrate another year with custom frames",
    image: birthdayFrameImage,
  },
  {
    title: "Marriage Frames",
    description: "Commemorate your love story",
    image: marriageFrameImage,
  },
];

const HandcraftedCollections = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Automatically switch slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden font-notoSerif">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Handcrafted Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-lora">
            Each category represents years of expertise and dedication to the craft. Explore our range
            of handmade products, perfect for every special moment in your life.
          </p>
        </div>

        <div className="relative">
          <div className="relative h-[600px] w-full overflow-hidden rounded-xl">
            {categories.map((category, index) => (
              <div
                key={category.title}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === activeIndex
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-90 z-0"
                  }`}
              >
                <div className="relative h-full w-full">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white bg-black bg-opacity-30">
                    <h3 className="text-3xl font-bold mb-2">{category.title}</h3>
                    <p className="text-lg mb-4">{category.description}</p>
                    <Link
                      to={`/products?category=${category.title
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <button className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Explore Collection
                        <MdArrowForward className="ml-2 h-5 w-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${index === activeIndex ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HandcraftedCollections;
