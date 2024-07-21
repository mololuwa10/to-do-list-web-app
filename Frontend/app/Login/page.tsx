"use client";

import React, { useState } from "react";
import { useLogin } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
    const router = useRouter();
    const { login, error } = useLogin();

    const [formData, setFormData] = useState({
        usernameOrEmail: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(formData.usernameOrEmail, formData.password);
        } catch (err) {
            // Handle the error if needed
        } finally {
            setLoading(false);
        }
    };

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
                <div className="text-center lg:text-left max-w-3xl">
                    <div className="text-center">
                        <motion.h1
                            className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span>Welcome Back</span>
                        </motion.h1>
                        <motion.p
                            className="mt-2 text-lg text-gray-700 sm:text-xl md:text-2xl"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            We&apos;re glad to see you again!
                        </motion.p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 grid grid-cols-6 gap-6"
                    >
                        {error && (
                            <div className="col-span-6 text-red-500 mb-4">
                                {error}
                            </div>
                        )}

                        {[
                            {
                                name: "usernameOrEmail",
                                label: "Username or Email",
                            },
                            { name: "password", label: "Password" },
                        ].map(({ name, label }) => (
                            <div className="col-span-6" key={name}>
                                <label
                                    htmlFor={name}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {label}
                                </label>
                                <input
                                    type={
                                        name === "password"
                                            ? "password"
                                            : "text"
                                    }
                                    id={name}
                                    name={name}
                                    value={
                                        formData[name as keyof typeof formData]
                                    }
                                    onChange={handleChange}
                                    className={`mt-3 p-2 w-full rounded-md border-2 ${
                                        error && name === "usernameOrEmail"
                                            ? "border-red-500"
                                            : "border-gray-200"
                                    } bg-white text-sm text-gray-700 shadow-sm`}
                                />
                            </div>
                        ))}

                        <div className="col-span-6">
                            <p className="text-sm text-gray-500">
                                Don&apos;t have an account?{" "}
                                <a
                                    href="/Register"
                                    className="text-gray-700 underline"
                                >
                                    Sign up
                                </a>
                                .
                            </p>
                        </div>

                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                            <motion.button
                                type="submit"
                                className="inline-block shrink-0 rounded-md border border-gray-600 bg-gray-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-900 focus:outline-none focus:ring active:text-gray-500"
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <motion.div
                                        className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full border-t-transparent border-white"
                                        initial={{ opacity: 0, rotate: 0 }}
                                        animate={{ opacity: 1, rotate: 360 }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 5,
                                            ease: "linear",
                                        }}
                                    />
                                ) : (
                                    "Log in"
                                )}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
