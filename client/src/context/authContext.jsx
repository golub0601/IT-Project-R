import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [error, setError] = useState(null);  // For error handling

    // Login function
    const login = async (inputs) => {
        try {
            const res = await axios.post('http://localhost:8800/api/auth/login', inputs, {
                withCredentials: true  // Important to include cookies with requests
            });
            setCurrentUser(res.data);
            setError(null); // Reset error if login is successful
        } catch (err) {
            setError(err.response.data || "An error occurred during login.");
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await axios.post('http://localhost:8800/api/auth/logout', {}, {
                withCredentials: true
            });
            setCurrentUser(null);
        } catch (err) {
            setError(err.response.data || "An error occurred during logout.");
        }
    };

    // Store user info in localStorage
    useEffect(() => {
        if (currUser) {
            localStorage.setItem("user", JSON.stringify(currUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [currUser]);

    return (
        <AuthContext.Provider value={{ currUser, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};
