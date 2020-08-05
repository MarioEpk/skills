import invariant from "invariant";

export default (loader) => () => loader().then((loaded) => {
    const pckg = loaded.default;
    invariant(pckg.NAME, `Dynamically loaded module is missing "NAME" >>>>> ${loader.toString()}`);
    return pckg;
});
