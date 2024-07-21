/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { fetchUserDetails, UserDetails } from "@/lib/auth";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user details on component mount
        const getUserDetails = async () => {
            try {
                const details = await fetchUserDetails();
                setUserDetails(details);
            } catch (error) {
                console.error("Failed to fetch user details", error);
            } finally {
                setLoading(false);
            }
        };

        getUserDetails();
    }, []);

    return (
        <>
            <nav
                x-data="{ isOpen: false }"
                className="relative bg-white shadow dark:bg-gray-800"
            >
                <div className="container px-6 py-4 mx-auto">
                    <div className="lg:items-center lg:justify-between">
                        <div className="flex items-center justify-between">
                            <a href="/">
                                <img
                                    className="w-auto h-6 sm:h-7"
                                    src="https://merakiui.com/images/full-logo.svg"
                                    alt=""
                                />
                            </a>

                            <div className="flex lg:hidden">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="text-gray-800 dark:text-gray-200 focus:outline-none"
                                >
                                    {!isOpen ? (
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16m-7 6h7"
                                            ></path>
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            ></path>
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <div
                                className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
                                    isOpen
                                        ? "translate-x-0 opacity-100"
                                        : "opacity-0 -translate-x-full"
                                }`}
                            >
                                <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                                    <a
                                        href="#"
                                        className="px-6 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Home
                                    </a>
                                    <a
                                        href="#"
                                        className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        About us
                                    </a>
                                    <a
                                        href="#"
                                        className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Services
                                    </a>
                                    <a
                                        href="#"
                                        className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Contact
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center mt-4 lg:mt-0">
                                {/* Display profile button or Get Started button based on authentication status */}
                                {loading ? (
                                    <span>Loading...</span>
                                ) : userDetails ? (
                                    <button
                                        type="button"
                                        className="flex items-center focus:outline-none"
                                        aria-label="toggle profile dropdown"
                                    >
                                        <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                            <img
                                                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                                                className="object-cover w-full h-full"
                                                alt="avatar"
                                            />
                                        </div>
                                        <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">
                                            {userDetails.userName}
                                        </h3>
                                    </button>
                                ) : (
                                    <a
                                        href="/register"
                                        className="px-6 py-3 mx-3 mt-2 transition-colors border-2 duration-300 transform rounded-3xl lg:mt-0 dark:text-gray-200 text-white bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-700"
                                    >
                                        Get Started
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
