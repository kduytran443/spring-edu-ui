import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const commentService = {
    api: 'api/comment',

    async getByLessonId(lessonId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${lessonId}`, config);
        return response.json();
    },

    async post(comment) {
        const config = postConfig(comment);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async delete(id) {
        const config = deleteConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
};
