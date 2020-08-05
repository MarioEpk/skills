export default (packages, extraReducers = {}) => {
    const packageReducers = packages
        .filter((module) => module.reducer)
        .reduce((result, module) => ({[module.NAME]: module.reducer, ...result}), {});
    return {
        ...packageReducers,
        ...extraReducers,
    };
};
