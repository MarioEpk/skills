import {call, fork} from "redux-saga/effects";

import {formWrapper} from "core/form";
import router from "core/router";

import form from "./form";
import {cvApi} from "../../serverApi";

export default router.routerWrapper({
    * onPageEnter({id}) {
        yield fork(formSaga, id);
    },
});

const formSaga = formWrapper(form.FORM_NAME, {
    * initialize(cvId) {
        try {
            const payload = yield call(cvApi.fetchCv, cvId);
            return {
                [form.FIRST_NAME_FIELD]: payload.getIn(["user", "firstName"]),
            };
        } catch (e) {
            console.error(e);
        }
        return {};
    },
    * save(values, targetId) {
        // eslint-disable-next-line no-console
        console.log("saving", targetId, values);
        // yield call(beApi)
        // field error handling, test purpose only
        // yield call(testDataApi.getFormFieldErrorResponse, FIRST_FIELD);
    },
    success() {
        // transition somewhere? notification?
    },
});
