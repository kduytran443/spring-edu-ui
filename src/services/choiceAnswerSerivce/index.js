import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const choiceAnswerSerivce = {
    api: 'api/choice-answer',
    async getChoiceAnswersByChoiceQuestionId(choiceQuestionId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/choice-question/${choiceQuestionId}`, config);
        return response.json();
    },
    async getChoiceAnswerById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
    async getChoiceAnswerByDrawQuizId(drawQuizId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/draw-quiz/${drawQuizId}`, config);
        return response.json();
    },
    async postChoiceAnswer(choiceAnswer) {
        const config = postConfig(choiceAnswer);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async putChoiceAnswer(choiceAnswer) {
        const config = postConfig(choiceAnswer);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async deleteChoiceAnswer(choiceAnswer) {
        const config = postConfig(choiceAnswer);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
