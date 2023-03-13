import { LOCAL_STORAGE_NAME } from '~/constants';

const postConfig = (data) => {
    const jwt = getUserJWT();

    return {
        method: 'POST',
        headers: {
            Authorization: jwt,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
};

const putConfig = (data) => {
    const jwt = getUserJWT();

    return {
        method: 'PUT',
        headers: {
            Authorization: jwt,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
};

const deleteConfig = (data) => {
    const jwt = getUserJWT();

    return {
        method: 'DELETE',
        headers: {
            Authorization: jwt,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
};

const getUserJWT = () => {
    if (JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))) {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).jwt + '';
    }
    return '';
};

const getConfig = () => {
    const jwt = getUserJWT();

    if (!jwt) {
        return {
            method: 'GET',
        };
    }

    return {
        method: 'GET',
        headers: {
            Authorization: jwt,
            'Content-Type': 'application/json',
        },
    };
};

export { getConfig, postConfig, deleteConfig, getUserJWT, putConfig };
