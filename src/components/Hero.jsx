import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/hero.jpg";

const Hero = () => {
    return (
        <>
            <style>
                {`
                    /* Default styles */
                    .hero {
                        height: 90vh;
                        background-size: cover; 
                        background-position: center center;
                    }
                    
                    /* Tablets */
                    @media (max-width: 991px) {
                        .hero {
                            height: 70vh; /* Decrease height for tablet screen */
                        }
                    }

                    /* Phones and smaller screens */
                    @media (max-width: 575px) {
                        .hero {
                            height: 50vh; /* Decrease height further for small screens */
                        }
                    }
                `}
            </style>
            <div className="flex justify-center mx-4 pt-10 mb-10 bg-gray-50  ">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative text-white rounded-xl shadow-2xl w-full sm:ml-4 sm:mr-4 overflow-hidden hero "
                    style={{
                        backgroundImage: `url(${logo})`,
                    }}
                >
                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black  bg-opacity-40 text-[#FFFFFF] p-4">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl lg:text-6xl font-extrabold tracking-tight text-center "
                        >
                            WELCOME TO GIFTING TREE
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-4 text-lg lg:text-xl max-w-3xl mx-auto text-center font-semibold"
                        >
                            Explore Endless Gifting & Wedding Accessories Options
                        </motion.p>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-10"
                        >
                            <Link
                                to="/resin-products"
                                className="inline-block bg-white text-[#4B5945] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                Explore Our Collection
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Hero;
