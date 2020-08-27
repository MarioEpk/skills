import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import SliderUI from '@material-ui/core/Slider';
import {fn} from "core/util";

import css from "./Slider.module.scss";

const Slider = ({label, value, tabIndex, disabled, onChange, step, min, max}) => {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    return (
        <SliderUI
            className={css.input}
            onChangeCommitted={(_, newValue) => onChange(newValue)}
            onChange={(_, newValue) => setCurrentValue(newValue)}
            label={label}
            value={currentValue}
            tabIndex={tabIndex}
            disabled={disabled}
            step={step}
            min={min}
            max={max}
            marks
        />
    );
};

Slider.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.number,
    tabIndex: PropTypes.number,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
};

Slider.defaultProps = {
    value: undefined,
    label: undefined,
    onChange: fn.noop,
    tabIndex: null,
    disabled: false,
    min: 1,
    max: 5,
    step: 1,
};

export default Slider;
