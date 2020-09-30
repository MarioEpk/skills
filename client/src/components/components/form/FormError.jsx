import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

const FormError = ({errors}) => errors.count() > 0 && (
    errors.map((error) => (
        <div key={error}>{error}</div>
    ))
);

FormError.propTypes = {
    errors: IPropTypes.listOf(PropTypes.string),
};

FormError.defaultProps = {
    errors: List(),
};

export default FormError;
