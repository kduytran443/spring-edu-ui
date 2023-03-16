import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const reviewService = {
    api: 'api/review',
    async getReviewByUserAndClass(classId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/user-class/${classId}`, config);
        return response.json();
    },
    async postReview(review) {
        const config = postConfig(review);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async putReview(review) {
        const config = putConfig(review);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
