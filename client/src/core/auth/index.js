import {getToken, saveToken} from './token';

const isAuthenticated = () => !!getToken();

const getAuthToken = isAuthenticated() ? `Bearer ${getToken()}` : undefined;

export default {
    getToken,
    saveToken,
    isAuthenticated,
    getAuthToken,
};
