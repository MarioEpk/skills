import React from "react";
import PropTypes from "prop-types";
import SliderUI from '@material-ui/core/Slider';
import {fn} from "core/util";

import css from "./Slider.module.scss";

const Slider = ({label, defaultValue, tabIndex, disabled, onChange, step, min, max}) => (
    <SliderUI
        className={css.input}
        onChangeCommitted={(_, value) => onChange(value)}
        label={label}
        defaultValue={defaultValue}
        tabIndex={tabIndex}
        disabled={disabled}
        step={step}
        min={min}
        max={max}
        marks
    />
);

Slider.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    defaultValue: PropTypes.number,
    tabIndex: PropTypes.number,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
};

Slider.defaultProps = {
    defaultValue: undefined,
    label: undefined,
    onChange: fn.noop,
    tabIndex: null,
    disabled: false,
    min: 1,
    max: 5,
    step: 1,
};

export default Slider;
