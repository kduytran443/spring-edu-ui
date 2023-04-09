import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const topicService = {
    api: 'api/topic',

    async getTopicByClassId(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/class/${id}`, config);
        return response.json();
    },
    async getTopicById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },

    async postTopic(topic) {
        const config = postConfig(topic);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async putVisible(topic) {
        const config = putConfig(topic);
        const response = await fetch(`${API_BASE_URL}/${this.api}/visible`, config);
        return response.json();
    },

    async putOrdinalNumber(topic) {
        const config = putConfig(topic);
        const response = await fetch(`${API_BASE_URL}/${this.api}/ordinal`, config);
        return response.json();
    },

    async putTopic(topic) {
        const config = putConfig(topic);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async deleteTopic(topic) {
        const config = deleteConfig(topic);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
