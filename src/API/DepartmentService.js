import $api from "../http";

export const DEPARTMENT_POINT = 'department/';
export const DEPARTMENT_POINT_BY_STATUS = 'status/';

export default class DepartmentService {
    static async getAll(page = 0, size = 5, sort = 'name') {
        const response = await $api.get(DEPARTMENT_POINT, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        })
        return response;
    }

    static async getAllByStatus(page = 0, size = 5, sort = 'name', status = 'ACTIVE') {
        const response = await $api.get(DEPARTMENT_POINT + DEPARTMENT_POINT_BY_STATUS, {
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
        const response = await $api.get(DEPARTMENT_POINT + id);
        return response;
    }

    static async add(item) {
        const response = await $api.post(DEPARTMENT_POINT, item);
        return response;
    }

    static async update(id, item) {
        const response = await $api.patch(DEPARTMENT_POINT + id, item);
        return response;
    }
}