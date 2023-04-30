import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const certificationService = {
    api: 'api/certification',
    async getById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${id}`, config);
        return response.json();
    },

    async post(certificate) {
        const config = postConfig(certificate);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async put(certificate) {
        const config = putConfig(certificate);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async delete(id) {
        const config = deleteConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
};
