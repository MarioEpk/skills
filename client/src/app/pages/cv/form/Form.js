import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Loading, CvFormLayout, TextInput, FormError} from "components";
import {Field, compose, form, required} from "core/form";

import formImage from 'resources/images/resumeGuyImage.svg';

import {PROFILE_FIELD, FIRST_NAME_FIELD, FORM_NAME, LAST_NAME_FIELD, ROLE_FIELD} from "./constants";

const Container = ({submitting, errors}) => (
    <Loading loading={submitting}>
        <CvFormLayout
            title="Základní informace"
            leftColumn={[
                <Field
                    key={`key-${FIRST_NAME_FIELD}`}
                    component={TextInput}
                    placeholder="Jméno"
                    name={FIRST_NAME_FIELD}
                    validate={[required]}
                />,
                <Field
                    key={`key-${LAST_NAME_FIELD}`}
                    component={TextInput}
                    placeholder="Příjmení"
                    name={LAST_NAME_FIELD}
                    validate={[required]}
                />,
                <Field
                    key={`key-${ROLE_FIELD}`}
                    component={TextInput}
                    placeholder="Role"
                    name={ROLE_FIELD}
                />,
            ]}
            image={<img src={formImage} alt="form" />}
        >
            <Field
                key={`key-${PROFILE_FIELD}`}
                component={TextInput}
                placeholder="Profil"
                name={PROFILE_FIELD}
            />
            <FormError errors={errors} />
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

        </CvFormLayout>
    </Loading>
);

Container.propTypes = {
    submitting: PropTypes.bool.isRequired,
    errors: IPropTypes.listOf(PropTypes.string),
};

Container.defaultProps = {
    errors: List(),
};

export default compose(
    form(FORM_NAME),
)(Container);
