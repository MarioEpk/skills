import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

import css from './SearchInput.module.scss';

const SearchInput = ({value, name, label, onChange, placeholder}) => (
    <TextField
        className={classnames(css.input, css.searchInput)}
        name={name}
        onChange={(e) => {
            const {value: newValue} = e.target;
            onChange(newValue);
        }}
        label={label}
        value={value}
        placeholder={placeholder}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchRoundedIcon />
                </InputAdornment>
            ),
        }}
    />
);

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
    value: undefined,
    placeholder: undefined,
    label: undefined,
};

export default SearchInput;
