import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const discountService = {
    api: 'api/discount',
    async getAllByClassId(classId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/class/${classId}`, config);
        return response.json();
    },
    async get(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
    async post(discount) {
        const config = postConfig(discount);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async put(discount) {
        const config = putConfig(discount);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async delete(id) {
        const config = deleteConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
};
