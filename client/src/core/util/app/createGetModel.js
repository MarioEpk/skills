export default (NAME) => (state) => {
    // will be striped in production
    if (process.env.NODE_ENV === "development") {
        if (!state.has(NAME)) {
            throw new Error(`Package "${NAME}" is not in state. Did you forget to add a reducer?`);
        }
    }
    return state.get(NAME);
};
