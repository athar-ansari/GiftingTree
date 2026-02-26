import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 6 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                    <div className="w-full h-48 bg-gray-200 animate-pulse" />
                    <div className="p-6 space-y-4">
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                        <div className="flex justify-between items-center mt-4">
                            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
                            <div className="h-10 bg-gray-200 rounded animate-pulse w-1/3" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </>
    );
};

export default SkeletonLoader;
