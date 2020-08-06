import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import {v1 as uuidv1} from "uuid";
import {List} from "immutable";

import i18n from "core/i18n";

import {TO_TRANSLATE_PREFIX} from "./validation";

const FormField = (props) => {
    const idRef = useRef(uuidv1());
    const {t} = i18n.useTranslation();

    /**
     * Ugly ugly hack, but best performance. We change INSIDE of the passed object, so the reference is still same.
     */
    // eslint-disable-next-line no-param-reassign,react/destructuring-assignment
    props.meta.error = (props.meta.error || List())
        .map((msg) => {
            if (msg.startsWith(TO_TRANSLATE_PREFIX)) {
                return t(msg.replace(TO_TRANSLATE_PREFIX, ""));
            }
            return msg;
        });

    const {layoutComponent, inputComponent, ...rest} = props;
    const LayoutComponent = layoutComponent;
    const InputComponent = inputComponent;

    return (
        <LayoutComponent {...rest} id={idRef.current}>
            <InputComponent {...rest} id={idRef.current} />
        </LayoutComponent>
    );
};

FormField.propTypes = {
    layoutComponent: PropTypes.any.isRequired,
    inputComponent: PropTypes.any.isRequired,
    meta: PropTypes.shape({
        error: IPropTypes.listOf(PropTypes.string),
    }).isRequired,
    error: IPropTypes.listOf(PropTypes.string),
};

FormField.defaultProps = {
    error: List(),
};

export default FormField;
