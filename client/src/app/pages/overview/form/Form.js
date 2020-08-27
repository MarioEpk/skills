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
            title="Přidat životopis pro uživatele"
            buttons={[
                <Button
                    key="close"
                    type={Button.type.DANGER}
                    label="Zavřít"
                    onClick={onClose}
                />,
                <Button
                    key="create"
                    label="Vytvořit životopis"
                    onClick={handleSubmit}
                />,
            ]}
        >
            <Field
                component={TextInput}
                placeholder="Jméno"
                name={FIRST_NAME_FIELD}
                validate={[required]}
            />
            <Field
                component={TextInput}
                placeholder="Příjmení"
                name={LAST_NAME_FIELD}
                validate={[required]}
            />
            <Field
                component={TextInput}
                placeholder="Firemní email"
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
