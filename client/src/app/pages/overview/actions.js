import {NAME} from "./constants";

export const testDataActionGroup = {
    REQUEST: `${NAME}/TESTING_DATA/REQUEST`,
    REQUEST_FAIL: `${NAME}/TESTING_DATA/FAILURE`,
    REQUEST_SUCCESS: `${NAME}/TESTING_DATA/SUCCESS`,
    request: () => ({
        type: `${NAME}/TESTING_DATA/REQUEST`,
    }),
    requestFailure: () => ({
        type: `${NAME}/TESTING_DATA/FAILURE`,
    }),
    requestSuccess: (data) => ({
        type: `${NAME}/TESTING_DATA/SUCCESS`,
        payload: data,
    }),
};
