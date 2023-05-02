import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const noteService = {
    api: 'api/note',

    async getAllByFolderId(folderId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/note-folder/${folderId}`, config);
        return response.json();
    },
    async getById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
    async post(note) {
        const config = postConfig(note);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async put(note) {
        const config = putConfig(note);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async delete(id) {
        const config = deleteConfig();
        await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
    },
};
