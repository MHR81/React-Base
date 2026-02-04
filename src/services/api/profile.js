import requests from "./base/base-api";

const profileService = {
    getProfile: () => requests.get("/users/me"),
    updateProfile: (profileData) => requests.put("/profile", profileData),
    changePassword: (passwordData) => requests.post("/profile/change-password", passwordData),
};

export default profileService;