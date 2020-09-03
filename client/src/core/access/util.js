export const hasAccess = (userRole, accesses) => {
    if (!accesses) {
        return true;
    }
    return accesses.some((access) => access === userRole);
};
