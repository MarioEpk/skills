import React from "react";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import user from "core/user";
import {accesses as accessTypes} from "./constants";

const Access = ({accesses, children}) => {
    const currentUser = useSelector(user.getUser);

    return (
        accesses.some((access) => currentUser.role.name === access)
            ? <>{children}</>
            : null
    );
};

Access.propTypes = {
    accesses: PropTypes.arrayOf(PropTypes.oneOf(Object.values(accessTypes))).isRequired,
    children: PropTypes.node.isRequired,
};

export default Access;
