import { API_BASE_URL, LOCAL_STORAGE_NAME } from '~/constants';
import { getConfig } from '../config';

const authorize = async () => {
    return true;
};

const setUserInfo = (data) => {
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(data));
};

const getUserInfo = async () => {
    if (JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))) {
        let jwt = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).jwt + '';
        if (jwt) {
            const config = getConfig();
            const response = await fetch(`${API_BASE_URL}/api/user?jwt=${encodeURI(jwt)}`, config);
            return response.json();
        }
    }

    return null;
};

const getUserJWT = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).jwt + '';
};

export { setUserInfo, authorize, getUserInfo, getUserJWT };
