import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const fileService = {
    api: 'api/file',

    async postFileOnClassLessonId(classLessonId, file) {
        //classLessonId
        const config = postConfig(file);
        const response = await fetch(`${API_BASE_URL}/${this.api}?classLessonId=${classLessonId}`, config);
        return response.json();
    },

    async getFilesOnClassLessonId(classLessonId) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}?classLessonId=${classLessonId}`, config);
        return response.json();
    },
};
