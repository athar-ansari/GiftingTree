import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const Hero = () => {
    return (
        <>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white   "
            >
                <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center font-lora">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight   "
                    >
                        Handcrafted Treasures for Every Occasion

                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-xl max-w-3xl mx-auto   "
                    >
                        Discover our collection of artisanal creations, each piece telling a unique story.
                    </motion.p>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-10"
                    >
                        <Link
                            to="/products"
                            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg "
                        >
                            Explore Our Collection
                        </Link>
                    </motion.div>
                </div>
            </motion.div>


        </>
    )
}

export default Hero