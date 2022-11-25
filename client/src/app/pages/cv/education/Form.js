import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Button, Loading, FormError, TextInput, VerticalFormLayout, TextAreaInput, YearPicker} from "components";
import {Field, compose, form, required} from "core/form";
import i18n from "core/i18n";

import {SCHOOL_FIELD, FORM_NAME, FIELD_FIELD, YEAR_FROM_FIELD, YEAR_TO_FIELD, NOTE_FIELD} from "./constants";

const Container = ({handleSubmit, onClose, submitting, errors}) => {
    const {t} = i18n.useTranslation();

    return (
        <Loading loading={submitting}>
            <VerticalFormLayout
                title={t("education.title")}
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
                    placeholder={t("education.school.placeholder")}
                    name={SCHOOL_FIELD}
                    validate={[required]}
                    autoFocus
                />
                <Field
                    component={TextAreaInput}
                    placeholder={t("education.field.placeholder")}
                    name={FIELD_FIELD}
                />
                <Field
                    component={YearPicker}
                    placeholder={t("education.yearFrom.placeholder")}
                    name={YEAR_FROM_FIELD}
                    validate={[required]}
                />
                <Field
                    component={YearPicker}
                    placeholder={t("education.yearTo.placeholder")}
                    name={YEAR_TO_FIELD}
                    validate={[required]}
                />
                <Field
                    component={TextAreaInput}
                    placeholder={t("education.note.placeholder")}
                    name={NOTE_FIELD}
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
