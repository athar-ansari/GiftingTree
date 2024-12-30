import React from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ayesha Khan",
      rating: 5,
      comment:
        "The Nikah frame was absolutely beautiful! It added such a special touch to our wedding ceremony.",
      seed: "Aiden", // Unique seed
    },
    {
      id: 2,
      name: "Fatima Sheikh",
      rating: 4,
      comment:
        "The Nikah favors were adorable and so thoughtful! They made our wedding even more memorable for the guests.",
      seed: "Felix", // Unique seed
    },
    {
      id: 3,
      name: "Arjun Bhatia",
      rating: 4,
      comment:
        "Ordered a custom wedding register for my sister’s wedding, and everyone loved it! Beautifully detailed and well-made.",
      seed: "Liam", // Unique seed
    },
    {
      id: 4,
      name: "Ritu Malhotra",
      rating: 5,
      comment:
        "I bought a resin wall art piece, and it’s now the centerpiece of my living room. Everyone who visits compliments it!",
      seed: "Sophia", // Unique seed
    },
    {
      id: 5,
      name: "Neha Kapoor",
      rating: 5,
      comment:
        "The flower preservation frame is a treasure! It preserved my wedding bouquet beautifully and brought back such precious memories.",
      seed: "Oliver", // Unique seed
    },
    {
      id: 6,
      name: "Ankit Mehta",
      rating: 4,
      comment:
        "The bookmarks are stunning! Perfect for gifting to my book club friends. Loved the intricate designs!",
      seed: "Emma", // Unique seed
    },
  ];

  return (
    <div className="bg-gray-50 py-16 font-notoSerif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-indigo-700 text-center mb-12"
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    createAvatar(adventurer, {
                      seed: testimonial.seed,
                    }).toString()
                  )}`}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 font-lora">{testimonial.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
