import requests from "./base/base-api";

const authService = {
    register: (userData) => requests.post("/auth/register", userData),
    verifyOTP: (data) => requests.post("/auth/verify-otp", data),

    login: (data) => requests.post("/auth/login", data),

    forgotPassword: (data) => requests.post("/auth/forgot-password", data),
    resetPassword: (data) => requests.post("/auth/reset-password", data),

    logout: () => requests.post("/auth/logout"),
};

export default authService;