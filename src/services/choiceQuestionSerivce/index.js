import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const choiceQuestionSerivce = {
    api: 'api/choice-question',

    async getChoiceQuestionsByQuestionBankId(questionBankId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/question-bank/${questionBankId}`, config);
        return response.json();
    },
    async getChoiceQuestionsById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
    async postChoiceQuestion(choiceQuestion) {
        const config = postConfig(choiceQuestion);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async putChoiceQuestion(choiceQuestion) {
        const config = postConfig(choiceQuestion);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async deleteChoiceQuestion(choiceQuestion) {
        const config = deleteConfig(choiceQuestion);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
