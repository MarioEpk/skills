import React from "react";
import PropTypes from "prop-types";
import TextFieldUI from '@material-ui/core/TextField';
import {fn} from "core/util";

import css from "./TextInput.module.scss";
import FormInputHOC from "./FormInputHOC";

const TextInput = ({onChange, label, value, tabIndex, disabled, id, type, onBlur, ...rest}) => (
    <TextFieldUI
        className={css.input}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        value={value}
        variant="filled"
        tabIndex={tabIndex}
        disabled={disabled}
        id={id}
        type={type}
        {...rest}
    />
);

TextInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
    value: undefined,
    label: undefined,
    onBlur: fn.noop,
    tabIndex: null,
    disabled: false,
    type: "text",
};

export default FormInputHOC(TextInput);
