import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const noteFolderService = {
    api: 'api/note-folder',

    async getAllByUserId() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/user`, config);
        return response.json();
    },
    async getById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
    async post(noteFolder) {
        const config = postConfig(noteFolder);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async put(noteFolder) {
        const config = putConfig(noteFolder);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async delete(id) {
        const config = deleteConfig();
        await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
    },
};
