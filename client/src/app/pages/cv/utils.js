export const createMenuItems = (items) => items.map(({id, name}) => ({
    title: name,
    onClick: () => console.log(id),
}));
