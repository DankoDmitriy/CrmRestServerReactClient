import $api from "../http";

export const LTD_CONTRACT = 'ltd/contract/';
export const LTD_CONTRACT_BY_STATUS = 'status/';

export default class LtdContractService {
    static async getAll(page = 0, size = 15, sort = "number") {
        const response = await $api.get(LTD_CONTRACT, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        })
        return response;
    }

    static async getAllByStatus(page = 0, size = 15, sort = 'number', status = 'ACTIVE') {
        const response = await $api.get(LTD_CONTRACT + LTD_CONTRACT_BY_STATUS, {
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
        const response = await $api.get(LTD_CONTRACT + id)
        return response;
    }

    static async add(item) {
        const response = await $api.post(LTD_CONTRACT, item)
        return response;
    }

    static async update(id, item) {
        const response = await $api.patch(LTD_CONTRACT + id, item)
        return response;
    }
}