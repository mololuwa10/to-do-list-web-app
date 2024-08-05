/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import gsap from "gsap";

export default function Footer() {
    return (
        <div className="footer bg-black text-white py-8 px-4 md:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between pb-6 mb-36 space-y-8 md:space-y-0 md:space-x-8">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold">
                            Be Productive & Get TaskMate Today
                        </h2>
                        <p className="mt-3 mb-4">
                            Unlock the full potential of your productivity with
                            TaskMate. Download our app now.
                        </p>
                        <div className="flex flex-col md:flex-row md:space-y-0 space-y-6 md:space-x-6 mt-12">
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                href="#"
                                className="btn-app-store flex space-x-2 border rounded-full px-5 py-2"
                            >
                                <img
                                    src="https://img.icons8.com/?size=100&id=4PbFeZOKAc61&format=png&color=000000"
                                    alt="Download on the App Store"
                                    className="h-12"
                                />
                                <div>
                                    Download on the
                                    <p className="font-semibold">App Store</p>
                                </div>
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                href="#"
                                className="btn-play-store flex space-x-2 border rounded-full px-5 py-2"
                            >
                                <img
                                    src="https://img.icons8.com/?size=100&id=rZwnRdJyYqRi&format=png&color=000000"
                                    alt="Get it on Google Play"
                                    className="h-12"
                                />
                                <div>
                                    Get it on
                                    <p className="font-semibold">
                                        Google Play Store
                                    </p>
                                </div>
                            </motion.a>
                        </div>
                    </div>
                    <div className="hidden md:block w-px bg-gray-700"></div>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-32 w-full md:w-1/2">
                        <div>
                            <h3 className="text-lg font-semibold">Company</h3>
                            <ul className="mt-2 space-y-2">
                                <li>
                                    <a href="#" className="hover:underline">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Contacts
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Support</h3>
                            <ul className="mt-2 space-y-2">
                                <li>
                                    <a href="#" className="hover:underline">
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        FAQs
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Forums
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Legal</h3>
                            <ul className="mt-2 space-y-2">
                                <li>
                                    <a href="#" className="hover:underline">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Terms of Use
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4">
                    <p className="text-sm">
                        &copy; All Rights Reserved. {new Date().getFullYear()},
                        TaskMate
                    </p>
                    <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 mt-4 md:mt-0">
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            href="#"
                            className="flex items-center space-x-2 border px-5 py-2 rounded-full"
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000"
                                alt="Instagram"
                                className="h-6"
                            />
                            Instagram
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            href="#"
                            className="flex items-center space-x-2 border px-5 py-2 rounded-full"
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=yGcWL8copNNQ&format=png&color=000000"
                                alt="Facebook"
                                className="h-6"
                            />
                            Facebook
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            href="#"
                            className="flex items-center space-x-2 border px-5 py-2 rounded-full"
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=YfCbGWCWcuar&format=png&color=ffffff"
                                alt="X"
                                className="h-6"
                            />
                            X
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            href="#"
                            className="flex items-center space-x-2 border px-5 py-2 rounded-full"
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=19318&format=png&color=000000"
                                alt="YouTube"
                                className="h-6"
                            />
                            YouTube
                        </motion.a>
                    </div>
                </div>
            </div>
        </div>
    );

    // return (
    //     <div className="footer bg-black text-white py-8 px-4 md:px-16">
    //         <div className="max-w-7xl mx-auto">
    //             <div className="flex flex-col md:flex-row justify-between pb-6 mb-36">
    //                 <div className="w-full md:w-1/2">
    //                     <h2 className="text-2xl font-bold">
    //                         Be Productive & Get TaskMate Today
    //                     </h2>
    //                     <p className="mt-3 mb-4">
    //                         Unlock the full potential of your productivity with
    //                         TaskMate. Download our app now.
    //                     </p>
    //                     <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-6 space-x-6 mt-12">
    //                         <motion.a
    //                             whileHover={{ scale: 1.1 }}
    //                             href="#"
    //                             className="btn-app-store flex space-x-2 border rounded-full px-5 py-2"
    //                         >
    //                             <img
    //                                 src="https://img.icons8.com/?size=100&id=4PbFeZOKAc61&format=png&color=000000"
    //                                 alt="Download on the App Store"
    //                                 className="h-12"
    //                             />
    //                             <div>
    //                                 Download on the
    //                                 <p className="font-semibold">App Store</p>
    //                             </div>
    //                         </motion.a>
    //                         <motion.a
    //                             whileHover={{ scale: 1.1 }}
    //                             href="#"
    //                             className="btn-play-store flex space-x-2 border rounded-full px-5 py-2"
    //                         >
    //                             <img
    //                                 src="https://img.icons8.com/?size=100&id=rZwnRdJyYqRi&format=png&color=000000"
    //                                 alt="Get it on Google Play"
    //                                 className="h-12"
    //                             />
    //                             <div>
    //                                 Get it on
    //                                 <p className="font-semibold">
    //                                     Google Play Store
    //                                 </p>
    //                             </div>
    //                         </motion.a>
    //                     </div>
    //                 </div>
    //                 <div className="border-r-2"></div>

    //                 <div className="flex flex-col md:flex-row mt-8 md:mt-0 space-y-4 md:space-y-0 md:space-x-16">
    //                     <div>
    //                         <h3 className="text-lg font-semibold">Company</h3>
    //                         <ul className="mt-2 space-y-2">
    //                             <li>
    //                                 <a href="#" className="hover:underline">
    //                                     Home
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="#" className="hover:underline">
    //                                     About Us
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="#" className="hover:underline">
    //                                     Services
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="#" className="hover:underline">
    //                                     Contacts
    //                                 </a>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                     <div>
    //                         <h3 className="text-lg font-semibold">Support</h3>
    //                         <ul className="mt-2 space-y-2">
    //                             <li>
    //                                 <a href="#" className="hover:underline">
    //                                     Help Center
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="#" className="hover:underline">
    //                                     FAQs
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="#" className="hover:underline">
    //                                     Forums
    //                                 </a>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                     <div>
    //                         <h3 className="text-lg font-semibold">Legal</h3>
    //                         <ul className="mt-2 space-y-2">
    //                             <li>
    //                                 <a href="#" className="hover:underline">
    //                                     Privacy Policy
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a href="#" className="hover:underline">
    //                                     Terms of Use
    //                                 </a>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4">
    //                 <p className="text-sm">
    //                     &copy; All Rights Reserved. {new Date().getFullYear()},
    //                     TaskMate
    //                 </p>
    //                 <div className="flex space-x-8 mt-4 md:mt-0">
    //                     <motion.a
    //                         whileHover={{ scale: 1.1 }}
    //                         href="#"
    //                         className="flex items-center space-x-2 border px-5 py-2 rounded-full"
    //                     >
    //                         <img
    //                             src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000"
    //                             alt="Instagram"
    //                             className="h-6"
    //                         />
    //                         Instagram
    //                     </motion.a>
    //                     <motion.a
    //                         whileHover={{ scale: 1.1 }}
    //                         href="#"
    //                         className="flex items-center space-x-2 border px-5 py-2 rounded-3xl"
    //                     >
    //                         <img
    //                             src="https://img.icons8.com/?size=100&id=yGcWL8copNNQ&format=png&color=000000"
    //                             alt="Facebook"
    //                             className="h-6"
    //                         />
    //                         Facebook
    //                     </motion.a>
    //                     <motion.a
    //                         whileHover={{ scale: 1.1 }}
    //                         href="#"
    //                         className="flex items-center space-x-2 border px-5 py-2 rounded-3xl"
    //                     >
    //                         <img
    //                             src="https://img.icons8.com/?size=100&id=YfCbGWCWcuar&format=png&color=ffffff"
    //                             alt="X"
    //                             className="h-6"
    //                         />
    //                         X
    //                     </motion.a>
    //                     <motion.a
    //                         whileHover={{ scale: 1.1 }}
    //                         href="#"
    //                         className="flex items-center space-x-2 border px-5 py-2 rounded-3xl"
    //                     >
    //                         <img
    //                             src="https://img.icons8.com/?size=100&id=19318&format=png&color=000000"
    //                             alt="YouTube"
    //                             className="h-6"
    //                         />
    //                         Youtube
    //                     </motion.a>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
}
