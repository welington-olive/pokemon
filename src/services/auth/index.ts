export const login = {
    login: async ({ email, password }: { email: string, password: string }) => {
        const response = await api.post("/login", { email, password });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Login failed");
        }
    }
};

export const register = {
    
}