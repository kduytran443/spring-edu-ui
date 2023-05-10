import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const classService = {
    api: 'api/class',
    async searchClass(data) {
        const config = getConfig();
        let queryString = `${API_BASE_URL}/public/${this.api}-review/search?`;

        let hasPrevious = false;
        if (data.value) {
            queryString += `value=${data.value}`;
            hasPrevious = true;
        }
        if (data.categoryCode) {
            if (hasPrevious) {
                queryString += '&';
            }
            queryString += `categoryCode=${data.categoryCode}`;
            hasPrevious = true;
        }
        if (data.maxFee) {
            if (hasPrevious) {
                queryString += '&';
            }
            queryString += `maxFee=${data.maxFee}`;
            hasPrevious = true;
        }
        if (data.rating) {
            if (hasPrevious) {
                queryString += '&';
            }
            queryString += `rating=${data.rating}`;
            hasPrevious = true;
        }
        const response = await fetch(queryString, config);
        return response.json();
    },
    async getClassChart() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/chart`, config);
        return response.json();
    },
    async getClasses() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/api/class-intro`, config);
        return response.json();
    },
    async getClassIntroById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}-intro/${id}`, config);
        return response.json();
    },
    async getClassReviewCardByUserId() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}-review`, config);
        return response.json();
    },

    async postClass(classData) {
        const config = postConfig(classData);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async putClass(classData) {
        const config = putConfig(classData);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async deleteClass(classData) {
        const config = deleteConfig(classData);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async unblockClass(classId) {
        const config = deleteConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${classId}/unblock`, config);
        return response.json();
    },
    async changeClassTime(classData) {
        const config = putConfig(classData);
        const response = await fetch(`${API_BASE_URL}/${this.api}/time`, config);
        return response.json();
    },
    async changeClassStatus(classData) {
        const config = putConfig(classData);
        const response = await fetch(`${API_BASE_URL}/${this.api}/status`, config);
        return response.json();
    },
    async changeClassVisible(classData) {
        const config = putConfig(classData);
        const response = await fetch(`${API_BASE_URL}/${this.api}/visible`, config);
        return response.json();
    },
};
