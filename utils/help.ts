

export const setLocalStorage = (key: string, value: string) => {
    if (typeof window === 'undefined') {
        return;
    }
    localStorage.setItem(key, value);
}

export const getLocalStorage = (key: string) => {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage?.getItem(key);
}


export const getCvData = () => {
    return JSON.parse(getLocalStorage('cvData') || '{}');
}