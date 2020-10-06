import React from "react";
import PropTypes from "prop-types";
import TextFieldUI from '@material-ui/core/TextField';

import {fn} from "core/util";

import FormInputHOC from "./FormInputHOC";
import css from "./TextArea.module.scss";

const TextAreaInput = ({onChange, label, value, tabIndex, disabled, id, onBlur, rowsMax}) => (
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
        type="text"
        multiline
        rowsMax={rowsMax}
    />
);

TextAreaInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    rowsMax: PropTypes.number,
};

TextAreaInput.defaultProps = {
    value: undefined,
    label: undefined,
    onBlur: fn.noop,
    tabIndex: null,
    disabled: false,
    rows: 2,
};

export default FormInputHOC(TextAreaInput);
