import React from "react";
import PropTypes from "prop-types";

export default (Component) => {
    const Input = ({input, placeholder, tabIndex, type, disabled, id}) => (
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
        />
    );

    Input.propTypes = {
        input: PropTypes.shape({
            value: PropTypes.string,
            onChange: PropTypes.func.isRequired,
            onBlur: PropTypes.func.isRequired,
            onFocus: PropTypes.func.isRequired,
        }).isRequired,
        placeholder: PropTypes.string,
        tabIndex: PropTypes.number,
        type: PropTypes.string,
        disabled: PropTypes.bool,
        id: PropTypes.string.isRequired,
    };

    Input.defaultProps = {
        placeholder: null,
        tabIndex: null,
        disabled: false,
        type: "text",
    };

    return Input;
};
