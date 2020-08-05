import {Map} from "immutable";

// TODO create some better code for globally stored map?

let memory = Map();

export const registerRoutes = (object) => {
    const map = Map(object);
    memory = memory.merge(map);
    return object;
};

export const setComponent = (name, Container) => {
    const route = memory.get(name);
    route.Container = Container;
};

export const getRegisteredRoutes = () => memory;
