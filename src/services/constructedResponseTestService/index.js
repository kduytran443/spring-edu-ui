import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const constructedResponseTestService = {
    api: 'api/constructed-response-test',

    async getByClassExcerciseId(classExcerciseId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/class-excercise/${classExcerciseId}`, config);
        return response.json();
    },
    async getById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
    async post(data) {
        const config = postConfig(data);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async put(data) {
        const config = putConfig(data);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async delete(data) {
        const config = deleteConfig(data);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
