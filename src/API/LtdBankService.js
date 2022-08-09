import $api from "../http";

export const LTD_BANK = 'ltd/bank/';
export const LTD_BANK_BY_STATUS = 'status/';

export default class LtdBankService {
    static async getAll(page = 0, size = 15, sort = "requisites") {
        const response = await $api.get(LTD_BANK, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        })
        return response;
    }

    static async getAllByStatus(page = 0, size = 15, sort = 'requisites', status = 'ACTIVE') {
        const response = await $api.get(LTD_BANK + LTD_BANK_BY_STATUS, {
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
        const response = await $api.get(LTD_BANK + id);
        return response;
    }

    static async add(item) {
        const response = await $api.post(LTD_BANK, item);
        return response;
    }

    static async update(id, item) {
        const response = await $api.patch(LTD_BANK + id, item);
        return response;
    }
}