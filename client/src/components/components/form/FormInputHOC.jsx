import React from "react";
import IPropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";

export default (Component) => {
    const Input = ({input, placeholder, tabIndex, type, disabled, id, rowsMax}) => (
        <Component
            value={input.value || ""}
            label={placeholder}
            onChange={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            tabIndex={tabIndex}
            disabled={disabled}
            type={type}
            id={id}
            rowsMax={rowsMax}
        />
    );

    Input.propTypes = {
        input: PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, IPropTypes.list]),
            onChange: PropTypes.func.isRequired,
            onBlur: PropTypes.func.isRequired,
            onFocus: PropTypes.func.isRequired,
        }).isRequired,
        placeholder: PropTypes.string,
        tabIndex: PropTypes.number,
        type: PropTypes.string,
        disabled: PropTypes.bool,
        id: PropTypes.string.isRequired,
        rowsMax: PropTypes.number,
    };

    Input.defaultProps = {
        placeholder: null,
        tabIndex: null,
        disabled: false,
        type: "text",
        rowsMax: undefined,
    };

    return Input;
};
