import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Loading, Button, VerticalFormLayout} from "components";
import {Field, InputText, compose, form, FormError, required} from "core/form";

import {PROFILE_FIELD, FIRST_NAME_FIELD, FORM_NAME, LAST_NAME_FIELD} from "./constants";

const Container = ({handleSubmit, submitting, errors}) => (
    <Loading loading={submitting}>
        <VerticalFormLayout
            title="Můj životopis"
            buttons={[
                <Button
                    key="save"
                    label="Uložit"
                    onClick={handleSubmit}
                />,
            ]}
        >
            <Field
                component={InputText}
                placeholder="Jméno"
                name={FIRST_NAME_FIELD}
                validate={[required]}
            />
            <Field
                component={InputText}
                placeholder="Příjmení"
                name={LAST_NAME_FIELD}
                validate={[required]}
            />
            <Field
                component={InputText}
                placeholder="Profil"
                name={PROFILE_FIELD}
                validate={[required]}
            />
            <FormError errors={errors} />
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

        </VerticalFormLayout>
    </Loading>
);

Container.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    errors: IPropTypes.listOf(PropTypes.string),
};

Container.defaultProps = {
    errors: List(),
};

export default compose(
    form(FORM_NAME),
)(Container);
