import React from "react";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";
import {List} from "immutable";

import reduxForm from "./reduxForm";

const InnerForm = ({handleSubmit, reset, submitting, dirty, error, formComponent, initialized, ownProps}) => {
    const FormComponent = formComponent;
    const formProps = {
        errors: error,
        handleSubmit,
        reset,
        canSubmit: !submitting && dirty,
        canReset: !submitting,
        submitting,
        initialized,
        // do not pass more arguments from redux-form here carelessly. For example, form-wide valid prop means whole form
        // re-renders when some field changes validit. Epecially ones under ConditionalSection
        // if adding something here, definitely test theese!
    };
    return (
        <FormComponent {...formProps} {...ownProps} />
    );
};

InnerForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    error: IPropTypes.listOf(PropTypes.string),
    reset: PropTypes.func.isRequired,
    formComponent: PropTypes.any.isRequired,
    initialized: PropTypes.bool.isRequired,
    ownProps: PropTypes.object,
};

InnerForm.defaultProps = {
    error: List(),
    ownProps: {},
};

export default (formName, config) => (formComponent) => {
    const InnerFormComponent = reduxForm({
        ...config,
        destroyOnUnmount: false,
        form: formName,
    })((props) => <InnerForm {...props} formComponent={formComponent} />);

    // we want to preserve props from outside, so we store them in this props, and then
    // add them all into form later
    return (props) => <InnerFormComponent ownProps={{...props}} />;
};
