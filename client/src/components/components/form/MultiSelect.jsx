import React from "react";
import {List} from "immutable";
import classnames from "classnames";
import PropTypes from "prop-types";
import {FormControl, InputLabel, Select, Input, MenuItem, Checkbox, ListItemText, Chip} from '@material-ui/core';
import {fn} from "core/util";

import FormMultiSelectHOC from "./FormMultiSelectHOC";
import css from "./MultiSelect.module.scss";

export const MultiSelect = ({onChange, label, value: valueList, tabIndex, disabled, id, onBlur, options}) => {
    const handleChangeMultiple = (event) => {
        onChange(List(event.target.value));
    };

    return (
        <FormControl variant="filled" className={classnames("MuiFilledInput-root", css.main)}>
            <InputLabel id="demo-mutiple-checkbox-label">{label}</InputLabel>
            <Select
                labelId={id}
                id={id}
                multiple
                value={valueList}
                tabIndex={tabIndex}
                disabled={disabled}
                onChange={handleChangeMultiple}
                onBlur={onBlur}
                input={<Input className={css.input} />}
                renderValue={(selected) => options.reduce((acc, curr) => (
                    selected.findIndex((selectedValue) => selectedValue === curr.value) > -1 ? [curr.label, ...acc] : acc
                ), []).map((selectedOption) => <Chip key={selectedOption} label={selectedOption} />)}
            >
                {options.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        <Checkbox checked={valueList.some((itemId) => itemId === item.value)} />
                        <ListItemText primary={item.label} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

MultiSelect.propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    onBlur: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.array,
    tabIndex: PropTypes.number,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
};

MultiSelect.defaultProps = {
    value: undefined,
    label: undefined,
    onBlur: fn.noop,
    tabIndex: null,
    disabled: false,
};

export default FormMultiSelectHOC(MultiSelect);
