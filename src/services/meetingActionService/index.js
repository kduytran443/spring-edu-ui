import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const meetingActionService = {
    api: 'api/meeting-action',

    async getByClassId(classId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${classId}`, config);
        return response.json();
    },
    async getAllByClassIdAndRange(classId, startTime, endTime) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${classId}/${startTime}/${endTime}`, config);
        return response.json();
    },
    async post(meetingAction) {
        const config = postConfig(meetingAction);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
