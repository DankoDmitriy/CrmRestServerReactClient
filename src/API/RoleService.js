import axios from "axios";
import $api from "../http";

export const ROLES = 'role/';
export const ROLES_BY_STATUS = 'status/';

export default class RoleService {
    static async getAll(page = 0, size = 5, sort = 'name') {
        const response = await $api.get(ROLES, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        })
        return response;
    }

    static async getAllByStatus(page = 0, size = 5, sort = 'name', status = 'ACTIVE') {
        const response = await $api.get(ROLES + ROLES_BY_STATUS, {
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
        const response = await $api.get(ROLES + id)
        return response;
    }

    static async add(item) {
        const response = await $api.post(ROLES, item)
        return response;
    }

    static async update(id, item) {
        const response = await $api.patch(ROLES + id, item)
        return response;
    }
}