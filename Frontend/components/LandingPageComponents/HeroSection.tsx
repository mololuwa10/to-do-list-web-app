"use client";

import React from "react";
import { motion } from "framer-motion";
export default function HeroSection() {
    return (
        <>
            <section className="flex flex-col items-center justify-center p-4 bg-white">
                <motion.h1
                    className="mt-16 text-3xl font-bold text-center text-black sm:text-4xl md:text-5xl lg:text-6xl"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Get it done for REAL with
                    <br /> Powerful To-do list
                </motion.h1>
                <motion.p
                    className="mt-8 text-base text-center text-gray-600 sm:text-lg md:text-xl lg:text-2xl"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Become focused, organized, and calm with Task mate. Top task
                    manager
                    <br /> and to-do list app!
                </motion.p>
                <a href="/GetStarted">
                    <motion.button
                        className="px-6 py-3 mt-[8rem] text-base font-semibold text-white bg-gray-800 rounded-lg sm:mt-8 sm:px-8 sm:py-4 sm:text-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-75"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Start for free
                    </motion.button>
                </a>
            </section>
        </>
    );
}
