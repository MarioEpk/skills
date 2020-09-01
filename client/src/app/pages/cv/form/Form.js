import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Type} from "app/model/type";
import {Loading, CvFormLayout, TextInput, FormError, MultiSelect, TextAreaInput} from "components";
import {Field, compose, form, required, convertTypeToOptions} from "core/form";

import {PROFILE_FIELD, FIRST_NAME_FIELD, FORM_NAME, LAST_NAME_FIELD, POSITION_FIELD} from "./constants";
import AvatarImage from "./AvatarImage";

const Container = ({submitting, errors, positions}) => (
    <Loading loading={submitting}>
        <CvFormLayout
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
                    key={`key-${POSITION_FIELD}`}
                    component={MultiSelect}
                    placeholder="Pozice"
                    name={POSITION_FIELD}
                    options={convertTypeToOptions(positions)}
                />,
            ]}
            rightColumn={<AvatarImage />}
        >
            <Field
                key={`key-${PROFILE_FIELD}`}
                component={TextAreaInput}
                placeholder="Profil"
                name={PROFILE_FIELD}
            />
            <FormError errors={errors} />
        </CvFormLayout>
    </Loading>
);

Container.propTypes = {
    submitting: PropTypes.bool.isRequired,
    errors: IPropTypes.listOf(PropTypes.string),
    positions: IPropTypes.listOf(Type).isRequired,
};

Container.defaultProps = {
    errors: List(),
};

export default compose(
    form(FORM_NAME),
)(Container);
