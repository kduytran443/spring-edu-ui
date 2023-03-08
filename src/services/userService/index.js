import { API_BASE_URL } from '~/constants';
import { useUser } from '~/stores/UserStore';
import { getConfig } from '../config';

const authorize = async () => {
    return true;
};

const setUserInfo = (data) => {
    localStorage.setItem('spring_edu', JSON.stringify(data));
};

const getUserInfo = async () => {
    let jwt = JSON.parse(localStorage.getItem('spring_edu')).jwt + '';
    if (jwt) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/api/user?jwt=${encodeURI(jwt)}`, config);
        return response.json();
    }
    return null;
};

const getUserJWT = () => {
    return JSON.parse(localStorage.getItem('spring_edu')).jwt + '';
};

export { setUserInfo, authorize, getUserInfo, getUserJWT };
