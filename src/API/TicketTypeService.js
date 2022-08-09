import $api from "../http";

export const TICKET_TYPE = 'ticket/type/';
export const TICKET_TYPE_BY_STATUS = 'status/';

export default class TicketTypeService {

    static async getAll(page = 0, size = 5, sort = 'name') {
        const response = await $api.get(TICKET_TYPE, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        })
        return response;
    }

    static async getAllByStatus(page = 0, size = 5, sort = 'name', status = 'ACTIVE') {
        const response = await $api.get(TICKET_TYPE + TICKET_TYPE_BY_STATUS, {
            params: {
                page: page,
                size: size,
                sort: sort,
                status: status
            }
        })
        return response;
    }

    static async getById(id) {
        const response = await $api.get(TICKET_TYPE + id)
        return response;
    }

    static async add(item) {
        const response = await $api.post(TICKET_TYPE, item)
        return response;
    }

    static async update(id, item) {
        const response = await $api.patch(TICKET_TYPE + id, item)
        return response;
    }
}