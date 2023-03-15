import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const userDataService = {
    api: 'api/user',

    async getUserByUsername(username) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${username}`, config);
        return response.json();
    },
};
