import $api from "../http";

export const LTD_INSTANCE = 'ltd/instance/';
export const LTD_INSTANCE_BY_STATUS = 'status/';
export const LTD_INSTANCE_BY_LTD = 'ltd/';

export default class LtdInstanceService {
    static async getAll(page = 0, size = 15, sort = "ltd") {
        const response = await $api.get(LTD_INSTANCE, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        })
        return response;
    }

    static async getAllByStatus(page = 0, size = 15, sort = 'ltd', status = 'ACTIVE') {
        const response = await $api.get(LTD_INSTANCE + LTD_INSTANCE_BY_STATUS, {
            params: {
                page: page,
                size: size,
                sort: sort,
                status: status
            }
        })
        return response;
    }

    static async getAllByStatusAndLtdId(page = 0,
                                        size = 15,
                                        id,
                                        sort = 'ltd',
                                        status = 'ACTIVE') {
        const response = await $api.get(LTD_INSTANCE + LTD_INSTANCE_BY_LTD, {
            params: {
                page: page,
                size: size,
                sort: sort,
                status: status,
                id: id
            }
        })
        return response;
    }

    static async getById(id) {
        const response = await $api.get(LTD_INSTANCE + id);
        return response;
    }

    static async add(item) {
        const response = await $api.post(LTD_INSTANCE, item);
        return response;
    }

    static async update(id, item) {
        const response = await $api.patch(LTD_INSTANCE + id, item);
        return response;
    }
}