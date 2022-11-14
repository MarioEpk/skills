import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Loading, Button, TextInput, VerticalFormLayout, FormError} from "components";
import {Field, compose, form, required} from "core/form";

import {EMAIL_FIELD, FIRST_NAME_FIELD, FORM_NAME, LAST_NAME_FIELD} from "./constants";

const Container = ({handleSubmit, submitting, errors, onClose}) => (
    <Loading loading={submitting}>
        <VerticalFormLayout
            title="Add CV for user"
            buttons={(
                <>
                    <Button
                        key="create"
                        label="Create CV"
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
                placeholder="First name"
                name={FIRST_NAME_FIELD}
                validate={[required]}
                autoFocus
            />
            <Field
                component={TextInput}
                placeholder="Last name"
                name={LAST_NAME_FIELD}
                validate={[required]}
            />
            <Field
                component={TextInput}
                placeholder="Company email (@morosystems.cz)"
                name={EMAIL_FIELD}
                validate={[required]}
            />
            <FormError errors={errors} />
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

        </VerticalFormLayout>
    </Loading>
);

Container.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    errors: IPropTypes.listOf(PropTypes.string),
    onClose: PropTypes.func.isRequired,
};

Container.defaultProps = {
    errors: List(),
};

export default compose(
    form(FORM_NAME),
)(Container);
