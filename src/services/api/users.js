import requests from "./base/base-api";

const usersService = {
    getUsers: () => requests.get("/user/v1/get-usersList-by-admin"),
};

export default usersService;