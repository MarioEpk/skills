import {useSelector} from "react-redux";

import user from "core/user";

export default (accesses, ownerId = undefined) => {
    const currentUser = useSelector(user.getUser);
    return (returnValue) => {
        if (currentUser.id && currentUser.id === ownerId) {
            return returnValue;
        }
        return (accesses.some((access) => currentUser.role.name === access) ? returnValue : undefined);
    };
};
