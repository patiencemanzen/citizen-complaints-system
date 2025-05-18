"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    isAuthenticated: boolean;
    role: string | null;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => { },
    isAuthenticated: false,
    role: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const t = localStorage.getItem("token");
        setToken(t);
        if (t) {
            try {
                const decoded = jwtDecode<{ role?: string; roles?: string[] }>(t);
                let userRole = null;
                if (decoded.roles && Array.isArray(decoded.roles) && decoded.roles.length > 0) {
                    userRole = decoded.roles[0];
                } else if (decoded.role) {
                    userRole = decoded.role;
                }
                setRole(userRole);
            } catch {
                console.error("Invalid token");
                setRole(null);
            }
        } else {
            setRole(null);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated: !!token, role }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
