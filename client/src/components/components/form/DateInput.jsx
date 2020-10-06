import React from "react";
import PropTypes from "prop-types";
import TextFieldUI from '@material-ui/core/TextField';

import {fn} from "core/util";

import FormInputHOC from "./FormInputHOC";
import css from "./TextInput.module.scss";

const DateInput = ({onChange, label, value, tabIndex, disabled, id, onBlur}) => (
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
        type="date"
        InputLabelProps={{
            shrink: true,
        }}
    />
);

DateInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
};

DateInput.defaultProps = {
    value: undefined,
    label: undefined,
    onBlur: fn.noop,
    tabIndex: null,
    disabled: false,
};

export default FormInputHOC(DateInput);
