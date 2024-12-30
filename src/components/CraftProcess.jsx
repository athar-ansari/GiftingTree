import { motion } from 'framer-motion';
import Design from "../assets/selective.gif";
import Material from "../assets/material.gif";
import Handcrafting from "../assets/Handcrafting.gif";
import QualityCheck from "../assets/QualityCheck.gif";


const steps = [
  {
    image: Design,
    title: "Design Selection",
    description: "Choose from our curated collection or request a custom design"
  },
  {
    image: Material,
    title: "Material Selection",
    description: "Premium materials chosen for lasting beauty"
  },
  {
    image: Handcrafting,
    title: "Handcrafting",
    description: "Skilled artisans bring your vision to life"
  },
  {
    image: QualityCheck,
    title: "Quality Check",
    description: "Rigorous inspection ensures perfection"
  }
];

const CraftProcess = () => {
  return (
    <div className="bg-gray-50 py-16 font-notoSerif">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-700">Our Craft Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto -mt-3">
            Every piece is created with meticulous attention to detail
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="w-16 h-16 mx-auto mb-4">
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">{step.title}</h3>
              <p className="text-gray-600 text-center ">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CraftProcess;
