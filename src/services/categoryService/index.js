import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const categoryService = {
    api: 'api/category',

    async getCategorys() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}`, config);
        return response.json();
    },
    async findAll() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async getCategoryByCode(code) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${code}`, config);
        return response.json();
    },
    async getCategoryById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },

    async postCategory(category) {
        const config = postConfig(category);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async putCategory(category) {
        const config = putConfig(category);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async unblockCategory(category) {
        const config = putConfig(category);
        const response = await fetch(`${API_BASE_URL}/${this.api}/unblock`, config);
    },

    async deleteCategory(category) {
        const config = deleteConfig(category);
        await fetch(`${API_BASE_URL}/${this.api}`, config);
    },
};
