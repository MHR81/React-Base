import requests from "./base/base-api";

const ticketsService = {
    getTickets: () => requests.get("/ticket/v1/get-ticketsList-by-admin"),
};

export default ticketsService;