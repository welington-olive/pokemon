import { createContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const login = ({ email, password }: { email: string, password: string }) => {
        const response = await api.post("/login", { email, password });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Login failed");
        }
    };

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
};