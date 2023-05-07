import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const classMemberService = {
    api: 'api/class-member',

    async getClassMemberByClassId(classId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}?classId=${classId}`, config);
        return response.json();
    },
    async getClassMemberByUserAndClassId(classId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/class/${classId}`, config);
        return response.json();
    },
    async getInvitedClassMemberByClassId(classId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/invited?classId=${classId}`, config);
        return response.json();
    },
    async getRequestClassMemberByClassId(classId) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/request?classId=${classId}`, config);
        return response.json();
    },

    async getInvitedClassMemberByUsername(username) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/invited?username=${username}`, config);
        return response.json();
    },
    async getRequestClassMemberByUsername(username) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/request?username=${username}`, config);
        return response.json();
    },

    async getClassMemberByUserId(username) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}?username=${username}`, config);
        return response.json();
    },
    async acceptClassMember(classMember) {
        const config = postConfig(classMember);
        const response = await fetch(`${API_BASE_URL}/${this.api}/accept`, config);
        return response.json();
    },

    async postClassMember(classMember) {
        const config = postConfig(classMember);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async inviteClassMember(classMember) {
        const config = postConfig(classMember);
        const response = await fetch(`${API_BASE_URL}/${this.api}/invite`, config);
        return response.json();
    },

    async sendToWaitingList(classMember) {
        const config = putConfig(classMember);
        const response = await fetch(`${API_BASE_URL}/${this.api}/waiting-list`, config);
        return response.json();
    },
    async putClassMember(classMember) {
        const config = putConfig(classMember);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async deleteClassMember(classMember) {
        const config = deleteConfig(classMember);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async deleteCertification(classMember) {
        const config = deleteConfig(classMember);
        const response = await fetch(`${API_BASE_URL}/${this.api}/certification`, config);
        return response.json();
    },
};
