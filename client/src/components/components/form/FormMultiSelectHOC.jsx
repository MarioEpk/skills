import React from "react";
import IPropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";

const getValue = (value) => {
    if (value) {
        return Array.isArray(value) ? value : value.toJS();
    } else {
        return [];
    }
};

export default (Component) => {
    const Input = ({input, placeholder, tabIndex, disabled, id, options}) => (
        <Component
            value={getValue(input.value)}
            label={placeholder}
            onChange={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            tabIndex={tabIndex}
            disabled={disabled}
            id={id}
            options={options.toJS()}
        />
    );

    Input.propTypes = {
        input: PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.array, IPropTypes.list]),
            onChange: PropTypes.func.isRequired,
            onBlur: PropTypes.func.isRequired,
            onFocus: PropTypes.func.isRequired,
        }).isRequired,
        placeholder: PropTypes.string,
        tabIndex: PropTypes.number,
        disabled: PropTypes.bool,
        id: PropTypes.string.isRequired,
        options: IPropTypes.list.isRequired,
    };

    Input.defaultProps = {
        placeholder: null,
        tabIndex: null,
        disabled: false,
    };

    return Input;
};
