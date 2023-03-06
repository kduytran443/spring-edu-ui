import { API_BASE_URL } from '~/constants';
import { useUser } from '~/stores/UserStore';

const authorize = async () => {
    return true;
};

const setUserInfo = (data) => {
    localStorage.setItem('spring_edu', JSON.stringify(data));
};

const getUserInfo = async () => {
    let jwt = JSON.parse(localStorage.getItem('spring_edu')).jwt + '';
    if (jwt) {
        jwt = jwt.substring(7, jwt.length);
        const response = await fetch(`${API_BASE_URL}/public/api/user?jwt=${encodeURI(jwt)}`);
        return response.json();
    }
    return null;
};

const getUserJWT = () => {
    return JSON.parse(localStorage.getItem('spring_edu')).jwt + '';
};

export { setUserInfo, authorize, getUserInfo, getUserJWT };
