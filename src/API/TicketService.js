import $api from "../http";

export const TICKET = 'ticket/';

export default class TicketService {

    static async getAll(page = 0, size = 5, ticketOpenStatus = 1, sort = 'ticketType') {
        const response = await $api.get(TICKET, {
            params: {
                page: page,
                size: size,
                sort: sort,
                ticketOpenStatus: ticketOpenStatus
            }
        })
        return response;
    }

    static async getById(id) {
        const response = await $api.get(TICKET + id)
        return response;
    }

    static async add(item) {
        const response = await $api.post(TICKET, item)
        return response;
    }

    static async update(id, item) {
        const response = await $api.patch(TICKET + id, item)
        return response;
    }
}