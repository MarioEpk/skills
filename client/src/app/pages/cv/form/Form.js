import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Loading, CvFormLayout} from "components";
import {Field, InputText, compose, form, FormError, required} from "core/form";

import formImage from 'resources/images/resumeGuyImage.svg';

import {PROFILE_FIELD, FIRST_NAME_FIELD, FORM_NAME, LAST_NAME_FIELD, ROLE_FIELD} from "./constants";

const Container = ({submitting, errors}) => (
    <Loading loading={submitting}>
        <CvFormLayout
            title="Základní informace"
            leftColumn={[
                <Field
                    key={`key-${FIRST_NAME_FIELD}`}
                    component={InputText}
                    placeholder="Jméno"
                    name={FIRST_NAME_FIELD}
                    validate={[required]}
                />,
                <Field
                    key={`key-${LAST_NAME_FIELD}`}
                    component={InputText}
                    placeholder="Příjmení"
                    name={LAST_NAME_FIELD}
                    validate={[required]}
                />,
                <Field
                    key={`key-${ROLE_FIELD}`}
                    component={InputText}
                    placeholder="Role"
                    name={ROLE_FIELD}
                    validate={[required]}
                />,
            ]}
            image={<img src={formImage} alt="form" />}
        >
            <Field
                key={`key-${PROFILE_FIELD}`}
                component={InputText}
                placeholder="Profil"
                name={PROFILE_FIELD}
                validate={[required]}
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
