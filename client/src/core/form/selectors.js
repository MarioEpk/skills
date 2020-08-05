import {
    isDirty,
    formValueSelector,
    getFormError as reduxFormGetFormError,
    getFormInitialValues as reduxGetFormInitialValues,
    getFormValues as reduxGetFormValues,
    isSubmitting as reduxFormIsSubmitting,
} from "redux-form/immutable";
import {Map} from "immutable";

import {app} from "../util";

import {NAME} from "./constants";

const getModel = app.createGetModel(NAME);
export const getForm = (state) => getModel(state).get("form");

export const getFormFieldValue = (state, formName, fieldNameArray) => formValueSelector(formName, getForm)(state, fieldNameArray);
export const isSubmitting = (state, formName) => reduxFormIsSubmitting(formName, getForm)(state);
export const isFieldDirty = (state, formName, fieldNameArray) => isDirty(formName, getForm)(state, fieldNameArray);
export const isFieldGroupDirty = (state, formName, listOfFieldNameArray) => listOfFieldNameArray
    .map((fieldNameArray) => isFieldDirty(state, formName, fieldNameArray))
    .some((value) => value === true);
export const getFormError = (state, formName) => reduxFormGetFormError(formName, getForm)(state);
export const getFormInitialValues = (state, formName) => reduxGetFormInitialValues(formName, getForm)(state) || Map();
export const getFormValues = (state, formName) => reduxGetFormValues(formName, getForm)(state) || Map();
export const createFieldValueMatcher = (formName, fieldName, value) => (state) => (getFormFieldValue(state, formName, fieldName) === value);
