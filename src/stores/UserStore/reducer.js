import { ACTION_CLEAR_USER_INFO, ACTION_GET_USER_INFO, ACTION_SET_USER_INFO, LOCAL_STORAGE_NAME } from '~/constants';
import { getUserInfo, setUserInfo } from '~/services/userService';

export const initState = {};

function reducer(state, action) {
    console.log('action', action);
    switch (action.type) {
        case ACTION_SET_USER_INFO: {
            if (!localStorage.getItem(LOCAL_STORAGE_NAME)) {
                localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({}));
            }
            const newObj = { ...state, ...action.payload };
            const obj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
            obj.user = newObj;
            if (newObj.jwt) {
                obj.jwt = newObj.jwt;
            }
            localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(obj));
            return newObj;
        }
        case ACTION_GET_USER_INFO: {
            return getUserInfo();
        }
        case ACTION_CLEAR_USER_INFO: {
            localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({}));
            return {};
        }
        default:
            throw new Error('Error login!');
    }
    return initState;
}

export default reducer;
