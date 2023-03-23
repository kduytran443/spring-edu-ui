import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const reportService = {
    api: 'api/report',

    async get(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
    async getAll() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/all`, config);
        return response.json();
    },

    async getAllByClassId(classId) {
        const config = getConfig(classId);
        const response = await fetch(`${API_BASE_URL}/${this.api}/class/${classId}`, config);
        return response.json();
    },

    async postReport(report) {
        const config = postConfig(report);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
