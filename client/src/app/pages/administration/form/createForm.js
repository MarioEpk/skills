import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Loading, Button, TextInput, VerticalFormLayout, FormError} from "components";
import {Field, form, required} from "core/form";
import i18n from "core/i18n";

import {createFormName, NAME_FIELD} from "./constants";

const Container = ({handleSubmit, submitting, errors, onClose, editMode}) => {
    const {t} = i18n.useTranslation();
    return (
        <Loading loading={submitting}>
            <VerticalFormLayout
                title={editMode ? t(`update.button.label`) : t(`add.button.label`)}
                buttons={[
                    <Button
                        key="close"
                        type={Button.type.DANGER}
                        label={t(`close.button.label`)}
                        onClick={onClose}
                    />,
                    <Button
                        key="Create"
                        label={editMode ? t(`update.button.label`) : t(`add.button.label`)}
                        onClick={handleSubmit}
                        submit
                    />,
                ]}
            >
                <Field
                    component={TextInput}
                    placeholder={t(`name`)}
                    name={NAME_FIELD}
                    validate={[required]}
                    autoFocus
                />
                <FormError errors={errors} />
            </VerticalFormLayout>
        </Loading>
    );
};

Container.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    errors: IPropTypes.listOf(PropTypes.string),
    onClose: PropTypes.func.isRequired,
    editMode: PropTypes.bool,
};

Container.defaultProps = {
    errors: List(),
    editMode: false,
};

export default (typeName) => form(createFormName(typeName))(Container);
