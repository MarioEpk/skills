export const createMenuItems = (items, onClick) => items.map(({id, name}) => ({
    title: name,
    onClick: () => onClick(id),
}));
