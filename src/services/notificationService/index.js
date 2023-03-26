import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const notificationService = {
    api: 'api/notification',

    async getAllByUser() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/user`, config);
        return response.json();
    },
    async post(notification) {
        const config = postConfig(notification);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async readAll() {
        const config = putConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/read`, config);
        return response.json();
    },
};
