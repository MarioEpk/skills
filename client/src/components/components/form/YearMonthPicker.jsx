import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import {fn} from "core/util";
import classnames from "classnames";
import {InputLabel, FormControl} from "@material-ui/core";

import "react-datepicker/dist/react-datepicker.css";

import css from "./DatePicker.module.scss";
import FormInputHOC from "./FormInputHOC";

const YearMonthPicker = ({onChange, label, value, tabIndex, disabled, id, onBlur}) =>(
    <FormControl variant="filled" className={classnames("MuiFilledInput-root", css.yearPickerRoot)}>
        <InputLabel shrink>{label}</InputLabel>
        <DatePicker
            id={id}
            tabIndex={tabIndex}
            disabled={disabled}
            selected={fn.isEmpty(value) ? new Date() : new Date(value)}
            onChange={onChange}
            onBlur={onBlur}
            showMonthYearPicker
            dateFormat="yyyy-MM"
            popperClassName={classnames(css.datepickerPopper)}
        />
    </FormControl>
);

YearMonthPicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    tabIndex: PropTypes.number,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
};

YearMonthPicker.defaultProps = {
    value: undefined,
    label: undefined,
    onBlur: fn.noop,
    tabIndex: null,
    disabled: false,
};

export default FormInputHOC(YearMonthPicker);