import { deleteConfig, getConfig, postConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const messageService = {
    api: 'api/message',

    async getAllByClassId(classId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/class/${classId}`, config);
        return response.json();
    },
    async getById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },

    async post(message) {
        const config = postConfig(message);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async delete(message) {
        const config = deleteConfig(message);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
