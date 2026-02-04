import requests from "./base/base-api";

const adminsService = {
    getAdmins: () => requests.get("/admin/v1/get-adminsList-by-superadmin"),
};

export default adminsService;