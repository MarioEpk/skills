import {compose} from 'redux';

const isNil = (value) => (value === undefined || value === null);

export default {
    noop: () => {},
    array: (...value) => value.filter(Boolean),
    identity: (item) => item,
    block: () => new Promise(() => {}),
    isEmpty: (value) => typeof value === 'undefined' || value === null || value === '',
    compose,
    toObject: (result, [key, value]) => ({[key]: value, ...result}),
    sum: (acc, number) => acc + number,
    isNil,
    isNilOrEmpty: (value) => isNil(value) || value === '',
};
