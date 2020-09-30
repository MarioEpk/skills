import React from "react";
import {List} from "immutable";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";

import {Type} from "app/model/type";
import {Loading, CvFormLayout, TextInput, FormError, MultiSelect, TextAreaInput} from "components";
import {Field, compose, form, required, convertTypeToOptions} from "core/form";
import {accesses} from "core/access";

import {connect} from "react-redux";
import {PROFILE_FIELD, FIRST_NAME_FIELD, FORM_NAME, LAST_NAME_FIELD, POSITION_FIELD} from "./constants";
import AvatarImage from "./AvatarImage";
import {useAccessOrIsOwner} from "../utils";
import {getTypePositions} from "../selectors";

const Container = ({submitting, errors, positions}) => {
    const adminOrOwnerAccess = useAccessOrIsOwner([accesses.admin]);
    const isAdminOrOwner = adminOrOwnerAccess(true);

    return (
        <Loading loading={submitting}>
            <CvFormLayout
                leftColumn={[
                    <Field
                        key={`key-${FIRST_NAME_FIELD}`}
                        component={TextInput}
                        placeholder="First name"
                        name={FIRST_NAME_FIELD}
                        validate={[required]}
                        disabled={!isAdminOrOwner}
                    />,
                    <Field
                        key={`key-${LAST_NAME_FIELD}`}
                        component={TextInput}
                        placeholder="Last name"
                        name={LAST_NAME_FIELD}
                        validate={[required]}
                        disabled={!isAdminOrOwner}
                    />,
                    <Field
                        key={`key-${POSITION_FIELD}`}
                        component={MultiSelect}
                        placeholder="Position"
                        name={POSITION_FIELD}
                        options={convertTypeToOptions(positions)}
                        disabled={!isAdminOrOwner}
                    />,
                ]}
                rightColumn={<AvatarImage isAdminOrOwner={isAdminOrOwner} />}
            >
                <Field
                    key={`key-${PROFILE_FIELD}`}
                    component={TextAreaInput}
                    placeholder="Profile"
                    name={PROFILE_FIELD}
                    disabled={!isAdminOrOwner}
                />
                <FormError errors={errors} />
            </CvFormLayout>
        </Loading>
    );
};

Container.propTypes = {
    submitting: PropTypes.bool.isRequired,
    errors: IPropTypes.listOf(PropTypes.string),
    positions: IPropTypes.listOf(Type).isRequired,
};

Container.defaultProps = {
    errors: List(),
};

const mapStateToProps = (state) => ({
    positions: getTypePositions(state),
});

export default compose(
    form(FORM_NAME),
    connect(mapStateToProps),
)(Container);
