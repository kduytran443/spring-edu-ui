import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const classLessonService = {
    api: 'api/class-lesson',

    async getClassLessonServiceById(id) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },

    async postClassLesson(classLesson) {
        const config = postConfig(classLesson);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async putClassLesson(classLesson) {
        const config = putConfig(classLesson);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async deleteClassLesson(classLesson) {
        const config = deleteConfig(classLesson);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
