import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Button, Loading, FormError, TextInput, VerticalFormLayout, DateInput, TextAreaInput} from "components";
import {Field, compose, form, required} from "core/form";

import {SCHOOL_FIELD, FORM_NAME, FIELD_FIELD, YEAR_FROM_FIELD, YEAR_TO_FIELD, NOTE_FIELD} from "./constants";

const Container = ({handleSubmit, onClose, submitting, errors}) => (
    <Loading loading={submitting}>
        <VerticalFormLayout
            title="Education"
            buttons={(
                <>
                    <Button
                        key="create"
                        label="Add"
                        type={Button.type.COLORED}
                        onClick={handleSubmit}
                        submit
                    />
                    <Button
                        key="close"
                        label="Close"
                        onClick={onClose}
                    />
                </>
            )}
        >
            <Field
                component={TextInput}
                placeholder="School"
                name={SCHOOL_FIELD}
                validate={[required]}
                autoFocus
            />
            <Field
                component={TextAreaInput}
                placeholder="Field"
                name={FIELD_FIELD}
            />
            <Field
                component={DateInput}
                placeholder="From"
                name={YEAR_FROM_FIELD}
                validate={[required]}
            />
            <Field
                component={DateInput}
                placeholder="To"
                name={YEAR_TO_FIELD}
                validate={[required]}
            />
            <Field
F                component={TextAreaInput}
                placeholder="Note"
                name={NOTE_FIELD}
            />
            <FormError errors={errors} />
        </VerticalFormLayout>
    </Loading>
);

Container.propTypes = {
    submitting: PropTypes.bool.isRequired,
    errors: IPropTypes.listOf(PropTypes.string),
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

Container.defaultProps = {
    errors: List(),
};

export default compose(
    form(FORM_NAME),
)(Container);
