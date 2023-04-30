import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';
import { getUserJWT } from '../userService';

export const uploadService = {
    api: 'api/upload',

    async post(file) {
        const jwt = getUserJWT();

        const config = {
            method: 'POST',
            headers: {
                Authorization: jwt,
            },
            body: file,
        };
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
