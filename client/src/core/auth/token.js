let tokenCarrier = null;

export const getToken = () => tokenCarrier;

export const saveToken = (token) => {
    tokenCarrier = token;
};
