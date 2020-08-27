import React from "react";
import IPropTypes from "react-immutable-proptypes";
import {List} from "immutable";
import PropTypes from "prop-types";

import {Flex} from "../flex";

export const VerticalFieldLayout = ({
    label,
    children,
    meta,
}) => {
    const errors = meta.touched && meta.error ? meta.error : List();

    return (
        <Flex vertical>
            <div>
                {label}
            </div>
            <div>
                {children}
            </div>
            <div>{errors.size > 0 && errors.map((error) => <span key={error}>{error}</span>)}</div>
        </Flex>
    );
};

VerticalFieldLayout.propTypes = {
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    meta: PropTypes.shape({
        touched: PropTypes.bool.isRequired,
        error: IPropTypes.listOf(PropTypes.string),
    }).isRequired,
};

VerticalFieldLayout.defaultProps = {
    label: "",
};
