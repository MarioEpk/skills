import {actionTypes} from "redux-form/immutable";

export const fieldChangeMatcher = (formName, field) => (action) => action.type === actionTypes.CHANGE
    && action.meta
    && action.meta.form === formName
    && action.meta.field === field;
