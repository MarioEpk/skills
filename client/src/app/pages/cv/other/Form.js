import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Button, Loading, FormError, TextInput, VerticalFormLayout, YearMonthPicker, TextAreaInput} from "components";
import {Field, compose, form, required} from "core/form";
import i18n from "core/i18n";

import {NAME_FIELD, DESCRIPTION_FIELD, FORM_NAME, DATE_FIELD} from "./constants";

const Container = ({handleSubmit, onClose, submitting, errors}) => {
    const {t} = i18n.useTranslation();

    return (
        <Loading loading={submitting}>
            <VerticalFormLayout
                title={t("other.title")}
                buttons={(
                    <>
                        <Button
                            label={t("add.button.label")}
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
                    placeholder={t("other.name.placeholder")}
                    name={NAME_FIELD}
                    validate={[required]}
                    autoFocus
                />
                <Field
                    component={TextAreaInput}
                    placeholder={t("other.description.placeholder")}
                    name={DESCRIPTION_FIELD}
                />
                <Field
                    component={YearMonthPicker}
                    placeholder={t("other.date.placeholder")}
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
