import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';

interface User {
    data: {
        exp: number;
        username: string
    };
}

interface AuthContextProps {
    user: User | null;
    getUser: () => User | null;
    userIsAuthenticated: () => boolean;
    userLogin: (user: User) => void;
    userLogout: () => void;
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

        // if user has token expired, logout user
        // @ts-ignore
        if (Date.now() > storedUser.data.exp * 1000) {
            userLogout();
            return false;
        }
        return true;
    };

    const userLogin = (loggedInUser: User): void => {
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
    };

    const userLogout = (): void => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const contextValue: AuthContextProps = {
        user,
        getUser,
        userIsAuthenticated,
        userLogin,
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

export {AuthProvider};
