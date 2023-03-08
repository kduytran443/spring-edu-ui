const postConfig = (data) => {
    const jwt = getUserJWT();

    return {
        method: 'GET',
        headers: {
            Authorization: jwt,
        },
    };
};

const getUserJWT = () => {
    return JSON.parse(localStorage.getItem('spring_edu')).jwt + '';
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
        },
    };
};

export { getConfig, postConfig };
