import React from "react";
import IPropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";

export default (Component) => {
    const Input = ({input, tabIndex, disabled, id, options}) => (
        <Component
            value={input.value || null}
            onChange={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            tabIndex={tabIndex}
            disabled={disabled}
            id={id}
            options={options}
        />
    );

    Input.propTypes = {
        input: PropTypes.shape({
            value: PropTypes.string,
            onChange: PropTypes.func.isRequired,
            onBlur: PropTypes.func.isRequired,
            onFocus: PropTypes.func.isRequired,
        }).isRequired,
        tabIndex: PropTypes.number,
        disabled: PropTypes.bool,
        id: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        })).isRequired,
    };

    Input.defaultProps = {
        tabIndex: null,
        disabled: false,
    };

    return Input;
};
