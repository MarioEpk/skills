import {NAME} from './constants';

export const INITIALIZE = `${NAME}/INITIALIZE`;

export const initialize = () => ({
    type: INITIALIZE,
});
