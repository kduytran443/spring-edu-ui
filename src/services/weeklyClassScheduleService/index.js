import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';
export const weeklyClassScheduleService = {
    api: 'api/weekly-class-schedule',

    async getWeeklyClassSchedules() {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}`, config);
        return response.json();
    },
};
