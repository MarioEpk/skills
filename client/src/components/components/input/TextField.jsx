import React from "react";
import PropTypes from "prop-types";
import TextFieldUI from '@material-ui/core/TextField';

import css from "./TextField.module.scss";

const TextField = ({onChange, label, value, tabIndex, disabled, id, type}) => (
    <TextFieldUI
        className={css.input}
        onChange={onChange}
        label={label}
        value={value}
        variant="filled"
        tabIndex={tabIndex}
        disabled={disabled}
        id={id}
        type={type}
    />
);

TextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
};

TextField.defaultProps = {
    value: undefined,
    label: undefined,
    tabIndex: null,
    disabled: false,
    type: "text",
};

export default TextField;
