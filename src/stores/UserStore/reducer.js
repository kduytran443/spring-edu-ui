import { ACTION_GET_USER_INFO, ACTION_SET_USER_INFO } from '~/constants';
import { getUserInfo, setUserInfo } from '~/services/userService';

export const initState = {};

function reducer(state, action) {
    console.log('action', action);
    switch (action.type) {
        case ACTION_SET_USER_INFO: {
            const newObj = { ...state, ...action.payload };
            localStorage.setItem('spring_edu', JSON.stringify(newObj));
            return newObj;
        }
        case ACTION_GET_USER_INFO: {
            return getUserInfo();
        }
        default:
            throw new Error('Error login!');
    }
    return initState;
}

export default reducer;