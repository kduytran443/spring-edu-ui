import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const quizService = {
    api: 'api/quiz',

    async getQuizByClassExcerciseId(classExcerciseId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/class-excercise/${classExcerciseId}`, config);
        return response.json();
    },
    async getQuizById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
    async postQuiz(quiz) {
        const config = postConfig(quiz);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async putQuiz(quiz) {
        const config = putConfig(quiz);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async deleteQuiz(quiz) {
        const config = deleteConfig(quiz);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
