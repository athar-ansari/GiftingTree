import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 6 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex flex-col animate-pulse w-full">
                    {/* Portrait Image Skeleton */}
                    <div className="w-full aspect-[4/5] bg-[#1A2E1A]/5 rounded-[2rem] mb-6" />

                    {/* Text Metadata Skeleton */}
                    <div className="px-2 flex flex-col">
                        <div className="h-6 bg-[#1A2E1A]/5 rounded w-3/4 mb-6" />

                        <div className="flex justify-between items-end border-t border-[#1A2E1A]/5 pt-4 mt-2">
                            <div className="flex flex-col gap-2">
                                <div className="h-3 bg-[#1A2E1A]/5 rounded w-16" />
                                <div className="h-6 bg-[#1A2E1A]/5 rounded w-20" />
                            </div>

                            {/* Button Skeleton */}
                            <div className="h-10 bg-[#1A2E1A]/5 rounded-full w-28" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default SkeletonLoader;
