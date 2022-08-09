import axios from "axios";
import $api from "../http";

export const PHONE_TYPE_URL = 'phoneType/';

export default class PhoneTypeService {
    static async getAll(page = 0, size = 5, sort = 'name') {
        const response = await $api.get(PHONE_TYPE_URL, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        })
        return response;
    }

    static async getById(id) {
        const response = await $api.get(PHONE_TYPE_URL + id)
        return response;
    }

    static async add(phoneType) {
        return await $api.post(PHONE_TYPE_URL, phoneType);
        const response = await $api.post(PHONE_TYPE_URL, phoneType)
        return response;
    }

    static async update(id, phoneType) {
        const response = await $api.patch(PHONE_TYPE_URL + id, phoneType)
        return response;
    }
}