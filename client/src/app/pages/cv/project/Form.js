import React from "react";
import {connect} from "react-redux";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Type} from "app/model/type";
import {Button, Loading, TextInput, DateInput, FormError, VerticalFormLayout, MultiSelect, TextAreaInput} from "components";
import {Field, compose, form, required, convertTypeToOptions, getFormFieldValue} from "core/form";
import i18n from "core/i18n";

import {
    FROM_FIELD, TO_FIELD, COMPANY_FIELD, CONTRIBUTION_FIELD, POSITION_TYPES_FIELD, FORM_NAME, PROJECT_TYPE_FIELD, TECHNOLOGY_TYPE_FIELD,
} from "./constants";

const Container = ({handleSubmit, onClose, submitting, errors, positions, projectType, technologies}) => (
    <Loading loading={submitting}>
        <VerticalFormLayout
            title={`Project - ${projectType.name}`}
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
                component={DateInput}
                placeholder="From"
                name={FROM_FIELD}
                validate={[required]}
                autoFocus
            />
            <Field
                component={DateInput}
                placeholder="To"
                name={TO_FIELD}
            />
            <Field
                component={TextInput}
                placeholder="Company"
                name={COMPANY_FIELD}
            />
            <Field
                component={TextAreaInput}
                placeholder="Personal contribution"
                name={CONTRIBUTION_FIELD}
                rowsMax={8}
            />
            <Field
                component={MultiSelect}
                placeholder="Position"
                name={POSITION_TYPES_FIELD}
                options={convertTypeToOptions(positions)}
            />
            <Field
                component={MultiSelect}
                placeholder="Used technologies"
                name={TECHNOLOGY_TYPE_FIELD}
                options={convertTypeToOptions(technologies)}
            />
            <FormError errors={errors} />
        </VerticalFormLayout>
    </Loading>
);

    return (
        <Loading loading={submitting}>
            <VerticalFormLayout
                title={t(`project.title`) - `${projectType.name}`}
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
                    key={`key-${FROM_FIELD}`}
                    component={DateInput}
                    placeholder={t(`project.from.placeholder`)}
                    name={FROM_FIELD}
                    validate={[required]}
                    autoFocus
                />
                <Field
                    key={`key-${TO_FIELD}`}
                    component={DateInput}
                    placeholder={t(`project.to.placeholder`)}
                    name={TO_FIELD}
                />
                <Field
                    key={`key-${COMPANY_FIELD}`}
                    component={TextInput}
                    placeholder={t(`project.company.placeholder`)}
                    name={COMPANY_FIELD}
                />
                <Field
                    key={`key-${CONTRIBUTION_FIELD}`}
                    component={TextAreaInput}
                    placeholder={t(`project.contribution.placeholder`)}
                    name={CONTRIBUTION_FIELD}
                    rowsMax={8}
                />
                <Field
                    key={`key-${POSITION_TYPES_FIELD}`}
                    component={MultiSelect}
                    placeholder={t(`project.position.placeholder`)}
                    name={POSITION_TYPES_FIELD}
                    options={convertTypeToOptions(positions)}
                />
                <Field
                    key={`key-${TECHNOLOGY_TYPE_FIELD}`}
                    component={MultiSelect}
                    placeholder={t(`project.technologies.placeholder`)}
                    name={TECHNOLOGY_TYPE_FIELD}
                    options={convertTypeToOptions(technologies)}
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
    positions: IPropTypes.listOf(Type).isRequired,
    projectType: IPropTypes.record.isRequired,
    technologies: IPropTypes.listOf(Type).isRequired,
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
