import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const classScheduleService = {
    api: 'api/class-schedule',

    async getClassSchedules(classId) {
        //classLessonclassId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/class/${classId}`, config);
        return response.json();
    },
    async getClassSchedulesByUser() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/user`, config);
        return response.json();
    },

    async getClassScheduleByClassScheduleId(id) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${id}`, config);
        return response.json();
    },

    async postClassSchedule(classSchedule) {
        const config = postConfig(classSchedule);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async putClassSchedule(classSchedule) {
        const config = putConfig(classSchedule);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async deleteClassSchedule(classScheduleId) {
        const config = deleteConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${classScheduleId}`, config);
        return response.json();
    },
};
