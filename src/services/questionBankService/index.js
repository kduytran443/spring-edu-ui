import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const questionBankService = {
    api: 'api/question-bank',

    async getQuestionBankById(questionBankId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${questionBankId}`, config);
        return response.json();
    },
    async getQuestionBankByUser() {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async getQuestionBankByClassId(classId) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/class/${classId}`, config);
        return response.json();
    },

    async postQuestionBank(questionBank) {
        const config = postConfig(questionBank);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async putQuestionBank(questionBank) {
        const config = putConfig(questionBank);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async deleteQuestionBank(questionBank) {
        const config = deleteConfig(questionBank);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async postQuestionBankToClass(classId, questionBank) {
        const config = postConfig(questionBank);
        const response = await fetch(`${API_BASE_URL}/${this.api}/class/${classId}`, config);
        return response.json();
    },
    async deleteQuestionBankFromClass(classId, questionBank) {
        const config = deleteConfig(questionBank);
        const response = await fetch(`${API_BASE_URL}/${this.api}/class/${classId}`, config);
        return response.json();
    },
};
