import $api from "../http";

export const POSITION = 'position/';
export const POSITION_BY_STATUS = 'status/';

export default class PositionService {
    static async getAll(page = 0, size = 15, sort = "department.name") {
        const response = await $api.get(POSITION, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        })
        return response;
    }

    static async getAllByStatus(page = 0, size = 15, sort = 'name', status = 'ACTIVE') {
        const response = await $api.get(POSITION + POSITION_BY_STATUS, {
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
        const response = await $api.get(POSITION + id)
        return response;
    }

    static async add(item) {
        const response = await $api.post(POSITION, item)
        return response;
    }

    static async update(id, item) {
        const response = await $api.patch(POSITION + id, item)
        return response;
    }
}