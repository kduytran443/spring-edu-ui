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

export const topicService = {
    api: 'api/topic',

    async getTopicByClassId(id) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },

    async postTopic(topic) {
        const config = postConfig(topic);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
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
