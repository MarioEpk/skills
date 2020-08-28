import React from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiSlider: {
            root: {
                color: "#FCC000",
            },
            thumb: {
                '&:hover': {
                    boxShadow: "0 0 0 8px rgba(252, 192, 0, 0.24)",
                },
                '&.MuiSlider-active': {
                    boxShadow: "0 0 0 16px rgba(252, 192, 0, 0.24)",
                },
            },
        },
        MuiFormControl: {
            root: {
                '& label.Mui-focused': {
                    color: "#FCC000",
                },
                '& .MuiFilledInput-underline:after': {
                    borderBottomColor: "#FCC000",
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: "#FCC000",
                },
            },
        },
        MuiFormLabel: {
            root: {
                '&.Mui-focused': {
                    color: "#FCC000",
                },
            },
        },
        MuiCheckbox: {
            root: {
                color: "#FCC000",
            },
            colorSecondary: {
                '&.Mui-checked': {
                    color: "#FCC000",
                },
            },
        },
        MuiRadio: {
            root: {
                color: "#FCC000",
            },
            colorSecondary: {
                '&.Mui-checked': {
                    color: "#FCC000",
                },
            },
        },
        MuiSelect: {
            selectMenu: {
                whiteSpace: "unset",
            },
            select: {
                padding: "27px 12px 10px",
                textAlign: "left",
                '&:focus': {
                    backgroundColor: "unset",
                },
            },
        },
        MuiChip: {
            root: {
                margin: ".2rem .2rem .2rem 0",
            },
        },
    },
});

// eslint-disable-next-line react/prop-types
export default ({children}) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);
