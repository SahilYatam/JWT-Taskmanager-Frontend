import { api } from "./axios";

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        name: string;
    };
}

const loginUser = async (data: { email: string; password: string }) => {
    const res = await api.post<AuthResponse>("/auth/login", data);
    return res.data;
};

const signupUser = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const res = await api.post<AuthResponse>("/auth/signup", data);
    return res.data;
};

export const logoutUser = async () => {
    await api.post("/auth/logout");
};

const getMe = async () => {
    const res = await api.get<AuthResponse>("/auth/me");
    return res.data;
};

export const authApi = {
    loginUser,
    signupUser,
    logoutUser,
    getMe
}
