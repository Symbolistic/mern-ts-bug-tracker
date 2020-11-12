import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';

interface IContextValues {
	user: string;
	setUser: React.Dispatch<React.SetStateAction<string>>;
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

type AuthProviderProps = { children: React.ReactNode };

// Setup Context
const AuthContext = createContext<IContextValues | undefined>(undefined!);

// Setup Provider
function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState('');
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		AuthService.isAuthenticated().then((data) => {
			setUser(data.user);
			setIsAuthenticated(data.isAuthenticated);
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
		>
			{children}
		</AuthContext.Provider>
	);
}

// This will handle the Context being undefined, if its undefined it shoots an error, if not, we use Context
function useAuthContext() {
	const context = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuthContext must be used within a AuthProvider');
	}
	return context;
}

export { AuthProvider, useAuthContext };
