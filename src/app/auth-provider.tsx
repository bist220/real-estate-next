'use client'

import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
// import User from './types/User'
import { UserResponse } from './types/LoginResponse';

interface ContextType {
    user: UserResponse | null;
    setUser: Dispatch<SetStateAction<UserResponse | null>>;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<ContextType>({} as ContextType);

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState({} as UserResponse | null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
        if (storedIsAuthenticated) {
            setIsAuthenticated(JSON.parse(storedIsAuthenticated));
        }
    }, []);

    const authContextValue = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}