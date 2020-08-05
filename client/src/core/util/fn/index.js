import {compose} from 'redux';

export default {
    noop: () => {},
    array: (...value) => value.filter(Boolean),
    identity: (item) => item,
    block: () => new Promise(() => {}),
    isEmpty: (value) => typeof value === 'undefined' || value === null || value === '',
    compose,
    toObject: (result, [key, value]) => ({[key]: value, ...result}),
    sum: (acc, number) => acc + number,
};
