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
