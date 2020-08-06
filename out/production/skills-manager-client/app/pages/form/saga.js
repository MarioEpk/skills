import {fork, call, takeEvery, select, put} from "redux-saga/effects";

import {formWrapper, fieldChangeMatcher, getFormFieldValue, reset} from "core/form";
import router from "core/router";
import {testDataApi} from "app/serverApi";

import {FORM, FIRST_FIELD} from "./constants";

export default router.routerWrapper({
    * onPageEnter({id}) {
        yield fork(formSaga, id);
    },
});

const formSaga = formWrapper(FORM, {
    initialize(targetId) {
        return {
            [FIRST_FIELD]: `${targetId}`,
        };
    },
    * save(values, targetId) {
        // eslint-disable-next-line no-console
        console.log("saving", targetId, values);
        // yield call(beApi)
        // field error handling, test purpose only
        yield call(testDataApi.getFormFieldErrorResponse, FIRST_FIELD);
    },
    * persistentEffects() {
        // you can call function on field change
        yield takeEvery(fieldChangeMatcher(FORM, FIRST_FIELD), reactionOnFieldChange, FORM, FIRST_FIELD);
    },
    success() {
        // transition somewhere? notification?
    },
});

function* reactionOnFieldChange(formName, fieldName) {
    // eslint-disable-next-line no-console
    console.log(`Changing field ${fieldName} in form ${formName}`);
    // example for update form values based on field value
    const fieldValue = yield select((state) => getFormFieldValue(state, formName, fieldName));
    if (fieldValue === "reset") {
        // reset function will reset and submit form
        yield put(reset(formName));
    }
}
