import React, { createContext, useState, useContext } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({
    user: null,
    handleLogin: (token) => { },
    handleLogout: () => { }
})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = (token, name, roles) => {
        const decodedUser = jwt_decode(token);
        localStorage.setItem("email", decodedUser.sub);
        localStorage.setItem("name", name);
        localStorage.setItem("token", token);
        setUser(decodedUser);
    }

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}