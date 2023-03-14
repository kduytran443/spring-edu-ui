import { ACTION_CLEAR_USER_INFO, ACTION_GET_USER_INFO, ACTION_SET_USER_INFO } from '~/constants';

export const getUserInfo = (payload) => {
    return {
        payload: payload,
        type: ACTION_GET_USER_INFO,
    };
};

export const setUserInfo = (payload) => {
    return {
        payload: payload,
        type: ACTION_SET_USER_INFO,
    };
};

export const clearUserInfo = (payload) => {
    return {
        payload: payload,
        type: ACTION_CLEAR_USER_INFO,
    };
};
