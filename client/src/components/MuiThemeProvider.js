import React from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiSlider: {
            // Name of the rule
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
    },
});

// eslint-disable-next-line react/prop-types
export default ({children}) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);
