"use client"

import React, {useState} from "react";
import { motion } from "framer-motion";

export default function GetStarted() {
    return (
        <div className="flex flex-col-reverse lg:flex-row min-h-screen bg-gray-100">
            <div className="flex flex-1 items-center justify-center bg-black text-white p-6 mb-8 lg:mb-0">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Task Mate</h1>
                    <div className="w-full h-64 bg-gray-700 rounded-md flex items-center justify-center">
                        <p className="text-lg">Placeholder Image</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 items-center justify-center bg-white text-gray-800 p-6 rounded-lg">
                <div className="text-center lg:text-left max-w-md">
                    <motion.h2 
                        className="text-3xl font-bold mb-4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Productive Mind
                    </motion.h2>
                    <motion.p 
                        className="mb-6 text-lg"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        With only the features you need, Task Mate is customized for individuals seeking a stress-free way to stay focused on their goals, projects, and tasks.
                    </motion.p>
                    <a href="/Register">
                        <motion.button 
                        className="w-full py-3 mb-4 text-lg font-semibold text-white bg-gray-800 rounded-lg lg:w-auto lg:px-10 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.button>
                    </a>
                   
                    <motion.div 
                        className="text-gray-600"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        Already have an account? <a href="/Login" className="text-blue-600 hover:underline">Sign in</a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}