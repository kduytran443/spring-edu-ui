import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const exerciseService = {
    api: 'api/class-excercise',

    async getExercisesByClassId(classId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/class/${classId}`, config);
        return response.json();
    },
    async getExercisesByUser() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/user`, config);
        return response.json();
    },
    async getExerciseById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
    async postExercise(exercise) {
        const config = postConfig(exercise);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async putExercise(exercise) {
        const config = putConfig(exercise);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async deleteExercise(exercise) {
        const config = deleteConfig(exercise);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async postQuestionBankToClass(classId, questionBank) {
        const config = postConfig(questionBank);
        const response = await fetch(`${API_BASE_URL}/${this.api}/class/${classId}`, config);
        return response.json();
    },

    async getFiles(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/file/${id}`, config);
        return response.json();
    },
    async deleteFile(exerciseId, fileId) {
        const config = deleteConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/file/${exerciseId}/${fileId}`, config);
        return response.json();
    },
};
