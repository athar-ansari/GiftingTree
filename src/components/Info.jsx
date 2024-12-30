import React from 'react'
import { motion } from "framer-motion";
import { FiTruck, FiPackage, FiMap } from "react-icons/fi";

const Info = () => {
    return (
        <>

            <div className="py-16 bg-white font-notoSerif">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <FiTruck className="w-12 h-12 mx-auto text-indigo-600" />
                            <h3 className="mt-4 text-xl font-semibold">All India Delivery</h3>
                            <p className="mt-2 text-gray-600 font-lora">
                                Fast and secure shipping across India
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <FiPackage className="w-12 h-12 mx-auto text-indigo-600" />
                            <h3 className="mt-4 text-xl font-semibold">Custom Orders</h3>
                            <p className="mt-2 text-gray-600 font-lora">
                                Personalized artwork just for you
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <FiMap className="w-12 h-12 mx-auto text-indigo-600" />
                            <h3 className="mt-4 text-xl font-semibold">Premium Quality</h3>
                            <p className="mt-2 text-gray-600 font-lora">
                                Handcrafted with love and care
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Info