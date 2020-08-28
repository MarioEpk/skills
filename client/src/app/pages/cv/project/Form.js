import React from "react";
import {connect} from "react-redux";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";
import {Project, Type} from "app/model/type";

import {Button, Loading, TextInput, DateInput, FormError, VerticalFormLayout, MultiSelect, TextAreaInput} from "components";
import {Field, compose, form, required, convertTypeToOptions, getFormFieldValue} from "core/form";

import {
    FROM_FIELD, TO_FIELD, COMPANY_FIELD, CONTRIBUTION_FIELD, POSITION_TYPES_FIELD, FORM_NAME, PROJECT_TYPE_FIELD, TECHNOLOGY_TYPE_FIELD
} from "./constants";

const Container = ({handleSubmit, onClose, submitting, errors, positions, projectType}) => (
    <Loading loading={submitting}>
        <VerticalFormLayout
            title={`Projekt - ${projectType.name}`}
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
                />,
            ]}
        >
            <Field
                key={`key-${FROM_FIELD}`}
                component={DateInput}
                placeholder="Od"
                name={FROM_FIELD}
                validate={[required]}
            />
            <Field
                key={`key-${TO_FIELD}`}
                component={DateInput}
                placeholder="Do"
                name={TO_FIELD}
            />
            <Field
                key={`key-${COMPANY_FIELD}`}
                component={TextInput}
                placeholder="Firma"
                name={COMPANY_FIELD}
            />
            <Field
                key={`key-${CONTRIBUTION_FIELD}`}
                component={TextAreaInput}
                placeholder="Přispění na projektu"
                name={CONTRIBUTION_FIELD}
                rowsMax={8}
            />
            <Field
                key={`key-${POSITION_TYPES_FIELD}`}
                component={MultiSelect}
                placeholder="Pozice na projektu"
                name={POSITION_TYPES_FIELD}
                options={convertTypeToOptions(positions)}
            />
            <Field
                key={`key-${TECHNOLOGY_TYPE_FIELD}`}
                component={MultiSelect}
                placeholder="Technologie, kterou jste použili na projektu"
                name={TECHNOLOGY_TYPE_FIELD}
                options={convertTypeToOptions(projectType.technologies)}
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
    positions: IPropTypes.listOf(Type).isRequired,
    projectType: IPropTypes.record.isRequired,
};

Container.defaultProps = {
    errors: List(),
};

const mapStateToProps = (state) => ({
    projectTypeId: getFormFieldValue(state, FORM_NAME, PROJECT_TYPE_FIELD),
});

const mergeProps = ({projectTypeId}, dispatchProps, {projectTypes, ...ownProps}) => ({
    projectType: projectTypes.find((projectType) => projectType.id === projectTypeId.id),
    ...dispatchProps,
    ...ownProps,
});

export default compose(
    form(FORM_NAME),
    connect(mapStateToProps, null, mergeProps),
)(Container);
