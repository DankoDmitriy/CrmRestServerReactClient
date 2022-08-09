import $api from "../http";

export const CAR_POINT = 'car/';
export const CAR_POINT_BY_STATUS = 'status/'

export default class CarService {

    static async getAll(page = 0, size = 5, sort = 'number') {
        const response = await $api.get(CAR_POINT, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        })
        return response;
    }

    static async getAllByStatus(page = 0, size = 5, sort = 'number', status = 'ACTIVE') {
        const response = await $api.get(CAR_POINT + CAR_POINT_BY_STATUS, {
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
        const response = await $api.get(CAR_POINT + id);
        return response;
    }

    static async add(item) {
        const response = await $api.post(CAR_POINT, item)
        return response;
    }

    static async update(id, item) {
        const response = await $api.patch(CAR_POINT + id, item);
        return response;
    }
}