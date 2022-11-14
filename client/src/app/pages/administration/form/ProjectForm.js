import React from "react";
import {List} from "immutable";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";
import i18n from "core/i18n";

import {Type} from "app/model/type";
import {Loading, Button, TextInput, VerticalFormLayout, FormError, TextAreaInput, MultiSelect} from "components";
import {convertTypeToOptions, Field, form, required, compose} from "core/form";

import {createFormName, DESCRIPTION_FIELD, EXPORT_NAME_FIELD, NAME_FIELD, TECHNOLOGIES_FIELD} from "./constants";
import {availableTypes} from "../constants";
import {getTypeData} from "../selectors";

const Container = ({handleSubmit, submitting, errors, onClose, editMode, technologies}) => {
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
                        key="create"
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
                <Field
                    component={TextInput}
                    placeholder={t(`export.name`)}
                    name={EXPORT_NAME_FIELD}
                />
                <Field
                    component={MultiSelect}
                    placeholder={t(`used.technologies`)}
                    name={TECHNOLOGIES_FIELD}
                    validate={[required]}
                    options={convertTypeToOptions(technologies)}
                />
                <Field
                    component={TextAreaInput}
                    placeholder={t(`project.description`)}
                    name={DESCRIPTION_FIELD}
                    validate={[required]}
                    rowsMax={8}
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
    technologies: IPropTypes.listOf(Type).isRequired,
    onClose: PropTypes.func.isRequired,
    editMode: PropTypes.bool,
};

Container.defaultProps = {
    errors: List(),
    editMode: false,
};

const mapStateToProps = (state) => ({
    technologies: getTypeData(state, availableTypes.TECHNOLOGY),
});

export default compose(
    form(createFormName(availableTypes.PROJECT)),
    connect(mapStateToProps),
)(Container);
