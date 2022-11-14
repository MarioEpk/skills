import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Loading, Button, TextInput, VerticalFormLayout, FormError} from "components";
import {Field, compose, form, required} from "core/form";
import i18n from "core/i18n";

import {EMAIL_FIELD, FIRST_NAME_FIELD, FORM_NAME, LAST_NAME_FIELD} from "./constants";

const Container = ({handleSubmit, submitting, errors, onClose}) => {
    const {t} = i18n.useTranslation();

    return (
        <Loading loading={submitting}>
            <VerticalFormLayout
                title={t("overview.formTitle")}
                buttons={(
                    <>
                        <Button
                            label={t("create.button.label")}
                            type={Button.type.COLORED}
                            onClick={handleSubmit}
                            submit
                        />
                        <Button
                            label={t("close.button.label")}
                            onClick={onClose}
                        />
                    </>
                )}
            >
                <Field
                    component={TextInput}
                    placeholder={t("overview.firstName.placeholder")}
                    name={FIRST_NAME_FIELD}
                    validate={[required]}
                    autoFocus
                />
                <Field
                    component={TextInput}
                    placeholder={t("overview.lastName.placeholder")}
                    name={LAST_NAME_FIELD}
                    validate={[required]}
                />
                <Field
                    component={TextInput}
                    placeholder={t("overview.email.placeholder")}
                    name={EMAIL_FIELD}
                    validate={[required]}
                />
                <FormError errors={errors} />
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

            </VerticalFormLayout>
        </Loading>
    );
};

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
