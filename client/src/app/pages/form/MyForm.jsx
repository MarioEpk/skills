import React from "react";
import PropTypes from "prop-types";
import i18n from "core/i18n";
import IPropTypes from "react-immutable-proptypes";

import {Loading, Button} from "components";
import {Field, InputText, compose, form, HorizontalFieldLayout, FormError} from "core/form";

import {FORM, FIRST_FIELD, SECOND_FIELD} from "./constants";

const Container = ({handleSubmit, submitting, errors}) => {
    const {t} = i18n.useTranslation();
    return (
        <Loading loading={submitting}>
            <Field
                component={InputText}
                label={t("input.text")}
                name={FIRST_FIELD}
            />
            <Field
                component={InputText}
                label={t("input.text")}
                layout={HorizontalFieldLayout}
                name={SECOND_FIELD}
            />
            <FormError errors={errors} />
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <Button
                label={t("button.submit")}
                onClick={handleSubmit}
            />
        </Loading>
    );
};

Container.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    errors: IPropTypes.listOf(PropTypes.string),
};

export default compose(
    form(FORM),
)(Container);
