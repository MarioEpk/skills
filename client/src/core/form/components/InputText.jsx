import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({input, placeholder, tabIndex, type, disabled, id, pattern}) => (
    <input
        value={input.value || ""}
        placeholder={placeholder}
        onChange={input.onChange}
        pattern={pattern}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        tabIndex={tabIndex}
        disabled={disabled}
        type={type}
        id={id}
    />
);

InputText.propTypes = {
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
    pattern: PropTypes.string,
    id: PropTypes.string.isRequired,
};

InputText.defaultProps = {
    placeholder: null,
    tabIndex: null,
    disabled: false,
    pattern: null,
    type: "text",
};

export default InputText;
