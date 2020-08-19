import {call, put, takeEvery} from "redux-saga/effects";
import {change} from "redux-form";

import {formWrapper, reset} from "core/form";
import modal from "core/modal";

import {createFormName, DESCRIPTION_FIELD, ID_FIELD, NAME_FIELD} from "./constants";
import {createTypeActionGroup} from "../actions";
import {modalFormName} from "../constants";
import {getApiForType} from "../utils";

export default (typeName) => {
    const action = createTypeActionGroup(typeName);
    const formName = createFormName(typeName);
    let api = {};
    try {
        api = getApiForType(typeName);
    } catch (e) {
        console.error(`ERROR with form saga - ${formName}`);
    }

    return (
        formWrapper(formName, {
            * save(values) {
                const valuesJs = values.toJS();
                if (values.get(ID_FIELD)) {
                    yield call(api.update, valuesJs);
                } else {
                    yield call(api.create, valuesJs);
                }
            },
            * success() {
                yield put(action.fetch());
                yield put(reset(formName));
                yield put(modal.close(modalFormName(typeName)));
            },
            * persistentEffects() {
                yield takeEvery(action.FILL, fillForm(formName));
            },
        })
    );
};

const fillForm = (formName) => (
    // eslint-disable-next-line func-names
    function* ({payload}) {
        yield put(change(formName, DESCRIPTION_FIELD, payload.description));
        yield put(change(formName, NAME_FIELD, payload.name));
        yield put(change(formName, ID_FIELD, payload.id));
    }
);
