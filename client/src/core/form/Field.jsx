import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Field as ReduxFormField} from 'redux-form/immutable';
import {List} from "immutable";
import memoizeOne from 'memoize-one';

import {VerticalFieldLayout} from 'components';
import FormField from './FormField';
import {compose} from "./normalization";

/**
 * This is to replace default redux form behavior, when only first failing validator is returned.
 */
const createGroupedValidation = (...validators) => (value, values, formParams, fieldName) => {
    const errorArray = validators
        .map((validationFn) => validationFn(value, values, formParams, fieldName))
        .filter((error) => !!error);
    if (errorArray.length > 0) {
        return List(errorArray);
    }
    return undefined;
};

class Field extends Component {
    constructor(props) {
        super(props);
        /**
         * For each instance of field, we will create memoized function for grouping ensuring, that for similar group of validators,
         * new grouped validator have same reference.
         * Its important to call them with destructuring, since we care about identities of validators inside of array, not about identity
         * of array, which will be new everytime.
         * This is to prevent strange behaviour of redux-form, which was failing when each render, new validators references were given.
         *
         * WARNING: currently, its working only for non-changeable validations. For ability to change validations during component lifecycle,
         * you need to implement this in componentWillUpdate (or deriveStateFromProps as for react 16)
         */
        this.groupErrorValidators = memoizeOne(createGroupedValidation);
    }

    render() {
        const {
            component, layout, validate, normalize, disabled, ...rest
        } = this.props;
        const passedProps = {
            component: FormField,
            layoutComponent: layout,
            inputComponent: component,
            format: null, // https://redux-form.com/7.4.2/docs/api/field.md/#-code-format-value-name-gt-formattedvalue-code-optional-
            normalize: Array.isArray(normalize) ? compose(...normalize) : normalize,
            ...rest,
        };
        return (
            <ReduxFormField
                {...passedProps}
                disabled={disabled}
                validate={!disabled ? [this.groupErrorValidators(...validate)] : []}
            />
        );
    }
}

Field.propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired,
    layout: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    validate: PropTypes.array,
    normalize: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    disabled: PropTypes.bool,
};

Field.defaultProps = {
    layout: VerticalFieldLayout,
    validate: [],
    normalize: null,
    disabled: false,
};

export default Field;
