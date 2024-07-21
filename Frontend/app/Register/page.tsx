"use client";

import React, { useState } from "react";
import { registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        marketing_accept: false,
    });

    const validateFormData = (data: typeof formData) => {
        const errors: { [key: string]: string } = {};
        if (!data.FirstName) errors.FirstName = "First Name is required.";
        if (!data.LastName) errors.LastName = "Last Name is required.";
        if (!data.email) errors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(data.email))
            errors.email = "Email address is invalid.";
        if (!data.username) errors.username = "Username is required.";
        if (!data.password) {
            errors.password = "Password is required.";
        } else {
            // Password must be at least 8 characters
            if (data.password.length < 8) {
                errors.password = "Passwords must be at least 8 characters.";
            }
            // Password must have at least one uppercase letter
            if (!/[A-Z]/.test(data.password)) {
                errors.password =
                    "Passwords must have at least one uppercase ('A'-'Z').";
            }
            // Password must have at least one digit
            if (!/\d/.test(data.password)) {
                errors.password =
                    "Passwords must have at least one digit ('0'-'9').";
            }
        }

        if (data.password !== data.confirmPassword)
            errors.confirmPassword = "Passwords do not match.";
        return errors;
    };

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        // Clear specific field error if it was fixed
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccess(null);

        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        try {
            const result = await registerUser(formData);
            setSuccess(result.message);
            setFormData({
                FirstName: "",
                LastName: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                marketing_accept: false,
            });
            router.push("/");
            console.log(result);
        } catch (err: any) {
            const errorResponse = err.message;
            setErrors({ global: errorResponse });
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
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 grid grid-cols-6 gap-6"
                    >
                        {errors.global && (
                            <div className="col-span-6 text-red-500 mb-4">
                                {errors.global}
                            </div>
                        )}
                        {success && (
                            <div className="col-span-6 text-green-500 mb-4">
                                {success}
                            </div>
                        )}

                        {[
                            "FirstName",
                            "LastName",
                            "email",
                            "username",
                            "password",
                            "confirmPassword",
                        ].map((field) => (
                            <div
                                className="col-span-6 sm:col-span-3"
                                key={field}
                            >
                                <label
                                    htmlFor={field}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {field.replace(/([A-Z])/g, " $1").trim()}
                                </label>
                                <input
                                    type={
                                        field.includes("Password")
                                            ? "password"
                                            : "text"
                                    }
                                    id={field}
                                    name={field}
                                    value={formData[
                                        field as keyof typeof formData
                                    ].toString()}
                                    onChange={handleChange}
                                    className={`mt-3 p-2 w-full rounded-md border-2 ${
                                        errors[field]
                                            ? "border-red-500"
                                            : "border-gray-200"
                                    } bg-white text-sm text-gray-700 shadow-sm`}
                                />
                                {errors[field] && (
                                    <p className="mt-1 text-red-500 text-sm">
                                        {errors[field]}
                                    </p>
                                )}
                            </div>
                        ))}

                        <div className="col-span-6">
                            <label
                                htmlFor="MarketingAccept"
                                className="flex gap-4"
                            >
                                <input
                                    type="checkbox"
                                    id="MarketingAccept"
                                    name="marketing_accept"
                                    checked={formData.marketing_accept}
                                    onChange={handleChange}
                                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                                />
                                <span className="text-sm text-gray-700">
                                    I want to receive emails about events,
                                    product updates and company announcements.
                                </span>
                            </label>
                        </div>

                        <div className="col-span-6">
                            <p className="text-sm text-gray-500">
                                By creating an account, you agree to our
                                <a href="#" className="text-gray-700 underline">
                                    {" "}
                                    terms and conditions{" "}
                                </a>
                                and
                                <a href="#" className="text-gray-700 underline">
                                    privacy policy
                                </a>
                                .
                            </p>
                        </div>

                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                            <button
                                type="submit"
                                className="inline-block shrink-0 rounded-md border border-gray-600 bg-gray-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-900 focus:outline-none focus:ring active:text-gray-500"
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating account..."
                                    : "Create an account"}
                            </button>

                            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                Already have an account?
                                <a
                                    href="/Login"
                                    className="text-gray-700 underline mx-2"
                                >
                                    Log in
                                </a>
                                .
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
