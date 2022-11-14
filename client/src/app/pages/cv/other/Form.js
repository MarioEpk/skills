import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Button, Loading, FormError, TextInput, VerticalFormLayout, DateInput, TextAreaInput} from "components";
import {Field, compose, form, required} from "core/form";
import i18n from "core/i18n";

import {NAME_FIELD, DESCRIPTION_FIELD, FORM_NAME, DATE_FIELD} from "./constants";

const Container = ({handleSubmit, onClose, submitting, errors}) => (
    <Loading loading={submitting}>
        <VerticalFormLayout
            title="Others"
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
                placeholder="Name"
                name={NAME_FIELD}
                validate={[required]}
                autoFocus
            />
            <Field
                component={TextAreaInput}
                placeholder="Description"
                name={DESCRIPTION_FIELD}
            />
            <Field
                component={DateInput}
                placeholder="Date"
                name={DATE_FIELD}
            />
            <FormError errors={errors} />
        </VerticalFormLayout>
    </Loading>
);

    return (
        <Loading loading={submitting}>
            <VerticalFormLayout
                title={t(`other.title`)}
                buttons={[
                    <Button
                        key="close"
                        type={Button.type.DANGER}
                        label={t(`close.button.label`)}
                        onClick={onClose}
                    />,
                    <Button
                        key="create"
                        label={t(`send.button.label`)}
                        onClick={handleSubmit}
                        submit
                    />,
                ]}
            >
                <Field
                    key={`key-${NAME_FIELD}`}
                    component={TextInput}
                    placeholder={t(`other.name.placeholder`)}
                    name={NAME_FIELD}
                    validate={[required]}
                    autoFocus
                />
                <Field
                    key={`key-${DESCRIPTION_FIELD}`}
                    component={TextAreaInput}
                    placeholder={t(`other.description.placeholder`)}
                    name={DESCRIPTION_FIELD}
                />
                <Field
                    key={`key-${DATE_FIELD}`}
                    component={DateInput}
                    placeholder={t(`other.date.placeholder`)}
                    name={DATE_FIELD}
                />
                <FormError errors={errors} />
            </VerticalFormLayout>
        </Loading>
    );
};

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
