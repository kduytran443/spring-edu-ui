export const renderToDate = (timeData) => {
    let time = new Date(timeData);
    return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
};
export const renderToTime = (timeData) => {
    let time = new Date(timeData);
    return `${time.getDate()}/${
        time.getMonth() + 1
    }/${time.getFullYear()} - ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
};
export const renderToJustHoursMinutesSeconds = (timeData) => {
    let time = new Date(timeData);
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
};
export const inputNumber = (value, callback) => {
    if (!isNaN(value) && !value.includes(' ')) {
        callback(value);
    }
};
export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};

export const showScore = (score) => {
    if (typeof score === 'number') {
        return score.toFixed(1);
    }
    return '';
};
export const renderToVND = (money) => {
    return `${money} VNĐ`;
};
export const isValidTime = (startTime, endTime) => {
    const date = new Date();
    return date.getTime() >= startTime && date.getTime() <= endTime;
};

export const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
};

export const isValidFileSize = (fileSize) => {
    if (fileSize > 26214400) {
        return false;
    }
    return true;
};
