import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        const res = await axios.post('http://localhost:8800/api/auth/login', inputs);
        setCurrentUser(res.data);
    }

    const logout = async () => {
        await axios.post('http://localhost:8800/api/auth/logout');
        setCurrentUser(null);
    }

    useEffect(() => {
        if (currUser) {
            localStorage.setItem("user", JSON.stringify(currUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [currUser]);

    return (
        <AuthContext.Provider value={{ currUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
