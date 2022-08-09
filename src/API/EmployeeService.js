import $api from "../http";

export const EMPLOYEE_POINT = 'employee/';
export const EMPLOYEE_POINT_BY_STATUS = 'status/';
export const EMPLOYEE_POINT_BY_DEPARTMENT = 'department/';
export const EMPLOYEE_POINT_UPDATE_ROLE = 'updateRoles/';

export default class EmployeeService {
    static async getAll(page = 0, size = 5, sort = 'firstName') {
        const response = await $api.get(EMPLOYEE_POINT, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        })
        return response;
    }

    static async getAllByStatus(page = 0, size = 5, sort = 'LastName', status = 'ACTIVE') {
        const response = await $api.get(EMPLOYEE_POINT + EMPLOYEE_POINT_BY_STATUS, {
            params: {
                page: page,
                size: size,
                sort: sort,
                status: status
            }
        })
        return response;
    }

    static async getAllByDepartmentIdAndStatus(page = 0,
                                               size = 5,
                                               id,
                                               sort = 'LastName',
                                               status = 'ACTIVE',
    ) {
        const response = await $api.get(EMPLOYEE_POINT + EMPLOYEE_POINT_BY_DEPARTMENT + id, {
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
        const response = await $api.get(EMPLOYEE_POINT + id);
        return response;
    }

    static async add(item) {
        const response = await $api.post(EMPLOYEE_POINT, item);
        return response;
    }

    static async update(id, item) {
        const response = await $api.patch(EMPLOYEE_POINT + id, item);
        return response;
    }

    static async updateRoles(id, item) {
        const response = await $api.patch(EMPLOYEE_POINT + EMPLOYEE_POINT_UPDATE_ROLE + id, item);
        return response;
    }
}