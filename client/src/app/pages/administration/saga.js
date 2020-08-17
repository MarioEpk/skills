import {all, call} from "redux-saga/effects";
import router from "core/router";

import {typeApi} from "app/serverApi";
import {createTypeActionGroup} from "./actions";
import {availableTypes, availableTypesArray} from "./constants";

export default router.routerWrapper({
    * getDataForPage() {
        return yield all(availableTypesArray.map((type) => call(getDataForType, type)));
    },
});

function* fetchDataForType(type) {
    switch (type) {
        case availableTypes.LANGUAGE: {
            return yield call(typeApi.fetchLanguageType);
        }
        default: {
            throw new Error(`Type - ${type} was not found`);
        }
    }
}

function* getDataForType(type) {
    const action = createTypeActionGroup(type);
    try {
        const payload = yield fetchDataForType(type);
        return action.fetchSuccess(payload);
    } catch (e) {
        console.error(e);
        return action.fetchFailure();
    }
}
