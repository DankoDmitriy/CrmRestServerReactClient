import $api from "../http";

export const LTD = 'ltd/';
export const LTD_BY_STATUS = 'status/';

export default class LtdService {
    static async getAll(page = 0, size = 15, sort = "nameShort") {
        const response = await $api.get(LTD, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        })
        return response;
    }

    static async getAllByStatus(page = 0, size = 15, sort = 'nameShort', status = 'ACTIVE') {
        const response = await $api.get(LTD + LTD_BY_STATUS, {
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
        const response = await $api.get(LTD + id)
        return response;
    }

    static async add(item) {
        const response = await $api.post(LTD, item)
        return response;
    }

    static async update(id, item) {
        const response = await $api.patch(LTD + id, item)
        return response;
    }
}