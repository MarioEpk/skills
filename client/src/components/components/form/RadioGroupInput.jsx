import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import {fn} from "core/util";

import FormRadioGroupHOC from "./FormRadioGroupHOC";
import css from "./RadioGroup.module.scss";

const RadioGroupInput = ({onChange, value, tabIndex, disabled, id, onBlur, options}) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };
    return (
        <FormControl className={css.main} id={id} component="fieldset" tabIndex={tabIndex} disabled={disabled}>
            <RadioGroup className={css.input} aria-label="radio-group" value={value} onChange={handleChange} onBlur={onBlur}>
                {
                    options.map(({value: radioValue, label: radioLabel}) => (
                        <FormControlLabel key={radioValue} value={radioValue} control={<Radio />} label={radioLabel} />
                    ))
                }
            </RadioGroup>
        </FormControl>
    );
};

RadioGroupInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
    })).isRequired,
};

RadioGroupInput.defaultProps = {
    value: undefined,
    onBlur: fn.noop,
    tabIndex: null,
    disabled: false,
};

export default FormRadioGroupHOC(RadioGroupInput);
