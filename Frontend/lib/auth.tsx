"use client";

import React, { useState, useEffect, useCallback } from "react";

export interface UserDetails {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    dateCreated: string;
    toDoItems: any[] | null;
    phoneNumber: string | null;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnabled: boolean;
    lockoutEnd: string | null;
    accessFailedCount: number;
    concurrencyStamp: string;
    securityStamp: string;
    emailConfirmed: boolean;
}
export const registerUser = async (userData: any) => {
    try {
        const response = await fetch(
            "http://localhost:5133/api/account/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            return data;
        } else {
            let errorMessage = `Error during registration: ${response.status}`;
            if (
                response.headers
                    .get("Content-Type")
                    ?.includes("application/json")
            ) {
                const errorData = await response.json();
                if (Array.isArray(errorData.messages)) {
                    errorMessage = errorData.messages.join(" ");
                } else {
                    errorMessage = errorData.message || errorMessage;
                }
            }
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error("There was an error registering the user: ", error);
        throw error;
    }
};

export const fetchUserDetails = async (): Promise<UserDetails | null> => {
    try {
        const token = localStorage.getItem("token"); // Make sure this key matches what you're using for storing the token

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch("http://localhost:5133/api/account/details", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data; // Assuming `data` matches your user details type
        } else {
            // Handle the error response
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch user details");
        }
    } catch (error: any) {
        console.error("There was an error fetching user details: ", error.message);
        return null;
    }
};
