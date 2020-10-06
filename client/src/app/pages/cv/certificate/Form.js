import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Button, Loading, TextInput, FormError, VerticalFormLayout, DateInput, TextAreaInput} from "components";
import {Field, compose, form, required} from "core/form";

import {NAME_FIELD, DESCRIPTION_FIELD, FORM_NAME, DATE_FIELD} from "./constants";

const Container = ({handleSubmit, onClose, submitting, errors}) => (
    <Loading loading={submitting}>
        <VerticalFormLayout
            title="Certifikát"
            buttons={[
                <Button
                    key="close"
                    type={Button.type.DANGER}
                    label="Zavřít"
                    onClick={onClose}
                />,
                <Button
                    key="create"
                    label="Odeslat"
                    onClick={handleSubmit}
                    submit
                />,
            ]}
        >
            <Field
                key={`key-${NAME_FIELD}`}
                component={TextInput}
                placeholder="Název certifikátu"
                name={NAME_FIELD}
                validate={[required]}
                autoFocus
            />
            <Field
                key={`key-${DESCRIPTION_FIELD}`}
                component={TextAreaInput}
                placeholder="Popis"
                name={DESCRIPTION_FIELD}
            />
            <Field
                key={`key-${DATE_FIELD}`}
                component={DateInput}
                placeholder="Datum získání certifikátu"
                name={DATE_FIELD}
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
