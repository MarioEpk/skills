import React from "react";
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

import css from './SearchInput.module.scss';

const SearchInput = ({onChange, name, label, value}) => (
    <TextField
        className={css.input}
        name={name}
        onChange={onChange}
        label={label}
        value={value}
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
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
};

SearchInput.defaultProps = {
    value: undefined,
};

export default SearchInput;
