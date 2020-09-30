import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Loading, Button, TextInput, VerticalFormLayout, FormError} from "components";
import {Field, form, required} from "core/form";

import {createFormName, NAME_FIELD} from "./constants";

const Container = ({handleSubmit, submitting, errors, onClose, editMode}) => (
    <Loading loading={submitting}>
        <VerticalFormLayout
            title={editMode ? "Update" : "Add"}
            buttons={[
                <Button
                    key="close"
                    type={Button.type.DANGER}
                    label="Close"
                    onClick={onClose}
                />,
                <Button
                    key="Create"
                    label={editMode ? "Update" : "Add"}
                    onClick={handleSubmit}
                    submit
                />,
            ]}
        >
            <Field
                component={TextInput}
                placeholder="Name"
                name={NAME_FIELD}
                validate={[required]}
                autoFocus
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

export default (typeName) => form(createFormName(typeName))(Container);
