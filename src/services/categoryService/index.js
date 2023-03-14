import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const categoryService = {
    api: 'api/category',

    async getCategoryByCode(code) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${code}`, config);
        return response.json();
    },

    async postCategory(category) {
        const config = postConfig(category);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async putCategory(category) {
        const config = putConfig(category);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async deleteCategory(category) {
        const config = deleteConfig(category);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
