import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

/*
    id
	name
	visiable
	status
	createdDate
	avatar
	accepted
	category
	backgroundImage
	video
	fee
	shortDescription
	creatorId
*/

export const classService = {
    api: 'api/class',

    async getClassIntroById(id) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${id}`, config);
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
