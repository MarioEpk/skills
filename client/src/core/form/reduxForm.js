import {reduxForm} from 'redux-form/immutable';

import {submitActionGroup} from "./actions";
import {getForm} from "./selectors";

export default (props) => reduxForm({
    ...props,
    // enableReinitialize: true,
    updateUnregisteredFields: true,
    touchOnChange: true,
    getFormState: getForm,
    validate: () => {},
    onSubmit: (data, dispatch) => new Promise((resolve, reject) => dispatch(submitActionGroup.submit(props.form, data, resolve, reject))),
    onSubmitFail: (errors, dispatch) => dispatch(submitActionGroup.submitFailure(props.form)),
});
