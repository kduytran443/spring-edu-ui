import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const textDataService = {
    api: 'api/text-data',

    async getTextDataByClassId(id) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}?classId=${id}`, config);
        return response.json();
    },
    async getTextDataByClassLessonId(id) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}?classLessonId=${id}`, config);
        return response.json();
    },

    async postTextDataClassLessonId(id, textData) {
        const config = postConfig(textData);
        const response = await fetch(`${API_BASE_URL}/${this.api}?classLessonId=${id}`, config);
        return response.json();
    },

    async postTextDataClassId(id, textData) {
        const config = postConfig(textData);
        const response = await fetch(`${API_BASE_URL}/${this.api}?classId=${id}`, config);
        return response.json();
    },

    async putTextData(textData) {
        const config = putConfig(textData);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
