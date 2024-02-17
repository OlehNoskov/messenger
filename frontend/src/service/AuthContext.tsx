import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import {login, logout, signup} from "./Service";
import { parseJwt } from "./ParserJwt";
import { UserSignInDto } from "../dto/UserSignIn.dto";
import { UserSignUpDto } from "../dto/UserSignUp.dto";

interface User {
    data: {
        // Expiration time for logged-in User
        exp: number;
        username: string;
        //Offline/Online
        status: string;
    };
}

interface AuthContextProps {
    getUser: () => User | null;
    userIsAuthenticated: () => boolean;
    userLogin: (user: UserSignInDto) => void;
    userSignUp: (user: UserSignUpDto) => void;
    userLogout: (username: string | undefined) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
        setUser(storedUser);
    }, []);

    const getUser = (): User | null => {
        return JSON.parse(localStorage.getItem('user') || 'null');
    };

    const userIsAuthenticated = (): boolean => {
        let storedUser = localStorage.getItem('user');

        if (!storedUser) {
            return false;
        }

        storedUser = JSON.parse(storedUser);

        // If user has token expired, logout user
        // @ts-ignore
        if (Date.now() > storedUser.data.exp * 60000) {
            // userLogout(storedUser?.data.username);
            return false;
        }
        return true;
    };

    const userLogin = async (user: UserSignInDto): Promise<void> => {
        const response = await login(user);

        localStorage.setItem('user', JSON.stringify(getLoggedInUser(response)));
        setUser(getLoggedInUser(response));
    };

    const userSignUp = async (user: UserSignUpDto): Promise<void> => {
        const response = await signup(user);

        localStorage.setItem('user', JSON.stringify(getLoggedInUser(response)));
        setUser(getLoggedInUser(response));
    };

    const getLoggedInUser = (response: any) => {
        const {accessToken} = response.data;
        const data = parseJwt(accessToken);

        return {data, accessToken};
    }

    const userLogout = (username: string | undefined): void => {
        logout(username);

        localStorage.removeItem('user');
        setUser(null);
    };

    const contextValue: AuthContextProps = {
        getUser,
        userIsAuthenticated,
        userLogin,
        userSignUp,
        userLogout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextProps {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { AuthProvider };
