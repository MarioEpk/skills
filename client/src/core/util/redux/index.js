const createSimpleReducer = (defaultState, type, property) => (state = defaultState, action) => (
    type === action.type ? action[property] : state
);

export default {
    createSimpleReducer,
};
