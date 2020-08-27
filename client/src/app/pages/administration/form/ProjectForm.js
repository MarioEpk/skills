import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Loading, Button, TextInput, VerticalFormLayout, FormError} from "components";
import {Field, form, required} from "core/form";

import {createFormName, DESCRIPTION_FIELD, NAME_FIELD} from "./constants";
import {availableTypes} from "../constants";

const Container = ({handleSubmit, submitting, errors, onClose, editMode}) => (
    <Loading loading={submitting}>
        <VerticalFormLayout
            title={editMode ? "Aktualizovat" : "Přidat"}
            buttons={[
                <Button
                    key="close"
                    type={Button.type.DANGER}
                    label="Zavřít"
                    onClick={onClose}
                />,
                <Button
                    key="create"
                    label={editMode ? "Aktualizovat" : "Vytvořit"}
                    onClick={handleSubmit}
                />,
            ]}
        >
            <Field
                component={TextInput}
                placeholder="Název"
                name={NAME_FIELD}
                validate={[required]}
            />
            <Field
                component={TextInput}
                placeholder="Popis projektu"
                name={DESCRIPTION_FIELD}
                validate={[required]}
            />
            <FormError errors={errors} />
        </VerticalFormLayout>
    </Loading>
);

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

export default form(createFormName(availableTypes.PROJECT))(Container);
