import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const drawQuizService = {
    api: 'api/draw-quiz',

    async getAllBySubmittedExerciseId(submittedExerciseId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${submittedExerciseId}`, config);
        return response.json();
    },
    async post(data) {
        const config = postConfig(data);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async getAnswersById(drawQuizId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/answer/${drawQuizId}`, config);
        return response.json();
    },
    async answerChoiceAnswerByChoiceAnswerId(choiceAnswerId, drawQuiz) {
        const config = postConfig(drawQuiz);
        const response = await fetch(`${API_BASE_URL}/${this.api}/answer/${choiceAnswerId}`, config);
        return response.json();
    },
};
