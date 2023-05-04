import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const submittedExerciseService = {
    api: 'api/submitted-exercise',

    async getSubmittedExercisesByUserAndClassExercise(classExerciseId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/class-exercise/user/${classExerciseId}`, config);
        return response.json();
    },
    async getSubmittedExercisesByUserIdAndClassId(userId, classId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/class/user/${classId}/${userId}`, config);
        return response.json();
    },
    async getSubmittedExercisesByUserAndClass(classId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/class/user/${classId}`, config);
        return response.json();
    },
    async getSubmittedExercisesForTeacher() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/teacher`, config);
        return response.json();
    },
    async getSubmittedExercisesByUserId(userId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/user/${userId}`, config);
        return response.json();
    },
    async getSubmittedExerciseById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
    async getSubmittedExercisesByClassExerciseId(classExerciseId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/class-exercise/${classExerciseId}`, config);
        return response.json();
    },
    async postSubmittedExercise(submittedExercise) {
        const config = postConfig(submittedExercise);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async putSubmittedExercise(submittedExercise) {
        const config = putConfig(submittedExercise);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async deleteSubmittedExercise(submittedExercise) {
        const config = deleteConfig(submittedExercise);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async submit(data) {
        const config = postConfig(data);
        const response = await fetch(`${API_BASE_URL}/${this.api}/submit`, config);
        return response.json();
    },
    async grade(score) {
        const config = putConfig(score);
        const response = await fetch(`${API_BASE_URL}/${this.api}/grade`, config);
        return response.json();
    },
};
