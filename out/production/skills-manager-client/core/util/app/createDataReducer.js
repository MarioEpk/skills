import invariant from "invariant";

export const createDataReducer = (actionType, initialState = null, isClearAction) => (state = initialState, action) => {
    if (isClearAction && isClearAction(action)) {
        return initialState;
    } else if (action.type === actionType) {
        invariant(!!action.payload, "Action set to 'createDataReducer' must have payload field.");
        return action.payload || initialState;
    }
    return state;
};
