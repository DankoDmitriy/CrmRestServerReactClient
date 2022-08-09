import $api from "../http";

export const CITI_POINT = 'city/';

export default class CityService {

    static async getAll(page = 0, size = 5, sort = 'name') {
        const response = await $api.get(CITI_POINT, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        })
        return response;
    }

    static async getById(id) {
        const response = await $api.get(CITI_POINT + id);
        return response;
    }

    static async addCity(city) {
        const response = await $api.post(CITI_POINT, city);
        return response;
    }

    static async update(id, city) {
        const response = await $api.patch(CITI_POINT + id, city);
        return response;
    }
}