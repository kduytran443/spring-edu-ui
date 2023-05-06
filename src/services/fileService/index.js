import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';
import { getUserJWT } from '../userService';

export const fileService = {
    api: 'api/file',

    async postFileOnClassLessonId(classLessonId, file) {
        const jwt = getUserJWT();

        const config = {
            method: 'POST',
            headers: {
                Authorization: jwt,
            },
            body: file,
        };

        const response = await fetch(`${API_BASE_URL}/${this.api}?classLessonId=${classLessonId}`, config);
        return response.json();
    },

    async getFilesOnClassLessonId(classLessonId) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}?classLessonId=${classLessonId}`, config);
        return response.json();
    },

    async get(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
};
