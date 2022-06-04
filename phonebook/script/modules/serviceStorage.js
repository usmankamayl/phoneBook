export const getStorage = (dataKey) => {
    return JSON.parse(localStorage.getItem(dataKey)) || [];
};
export const setStorage = (dataKey, obj) => {
    const data = getStorage(dataKey);
    data.push(obj);
    localStorage.setItem(dataKey, JSON.stringify(data));
};
export const  removeStorage = (phone) => {
    const data = getStorage('dataKey');
    data.forEach((obj, index) => {
        if (obj.phone === phone) {
            data.splice(index, 1);
        }

    })
    localStorage.setItem('dataKey', JSON.stringify( data));
};

