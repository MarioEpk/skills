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
                        onClick={handleSubmit}
                        submit
                    />
                    <Button
                        key="close"
                        type={Button.type.DANGER}
                        label="Close"
                        onClick={onClose}
                    />
                </>
            )}
        >
            <Field
                key={`key-${SCHOOL_FIELD}`}
                component={TextInput}
                placeholder="School"
                name={SCHOOL_FIELD}
                validate={[required]}
                autoFocus
            />
            <Field
                key={`key-${FIELD_FIELD}`}
                component={TextAreaInput}
                placeholder="Field"
                name={FIELD_FIELD}
            />
            <Field
                key={`key-${YEAR_FROM_FIELD}`}
                component={DateInput}
                placeholder="From"
                name={YEAR_FROM_FIELD}
                validate={[required]}
            />
            <Field
                key={`key-${YEAR_TO_FIELD}`}
                component={DateInput}
                placeholder="To"
                name={YEAR_TO_FIELD}
                validate={[required]}
            />
            <Field
                key={`key-${NOTE_FIELD}`}
                component={TextAreaInput}
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
