import {all, put, call} from "redux-saga/effects";

import notification from "core/notification";
import {typeApi} from "app/serverApi";

import {availableTypes, availableTypesArray} from "./constants";
import {createTypeActionGroup} from "./actions";

export function* fetchDataForAllTypes() {
    return yield all(availableTypesArray.map((type) => call(fetchDataForType, type)));
}

export function* fetchDataForType(type) {
    const action = createTypeActionGroup(type);
    try {
        const payload = yield call(getApiForType(type).fetch);
        yield put(action.fetchSuccess(payload));
    } catch (e) {
        console.error(e);
        yield put(notification.show("Problem with data fetching", null, notification.types.FAILED));
        yield put(action.fetchFailure());
    }
}

export function* removeItemFromType(type, {payload}) {
    try {
        yield call(getApiForType(type).remove, payload);
        // If remove is successful, we can clear any force delete confirmation id
        yield put(createTypeActionGroup(type).forceDeleteConfirmation(undefined));
        yield call(fetchDataForType, type);
        yield put(notification.show("Deleted"));
    } catch (e) {
        if (e.status === 422) {
            yield put(createTypeActionGroup(type).forceDeleteConfirmation(payload.id));
        } else {
            console.error(e);
            yield put(notification.show("Problem with deleting", null, notification.types.FAILED));
        }
    }
}

export const getApiForType = (type) => {
    switch (type) {
        case availableTypes.LANGUAGE: {
            return {
                fetch: typeApi.fetchLanguageTypes,
                remove: typeApi.deleteLanguageType,
                update: typeApi.updateLanguageType,
                create: typeApi.createLanguageType,
            };
        }
        case availableTypes.SKILL: {
            return {
                fetch: typeApi.fetchSkillTypes,
                remove: typeApi.deleteSkillType,
                update: typeApi.updateSkillType,
                create: typeApi.createSkillType,
            };
        }
        case availableTypes.TECHNOLOGY: {
            return {
                fetch: typeApi.fetchTechnologyTypes,
                remove: typeApi.deleteTechnologyType,
                update: typeApi.updateTechnologyType,
                create: typeApi.createTechnologyType,
            };
        }
        case availableTypes.PROJECT: {
            return {
                fetch: typeApi.fetchProjectTypes,
                remove: typeApi.deleteProjectType,
                update: typeApi.updateProjectType,
                create: typeApi.createProjectType,
            };
        }
        case availableTypes.POSITION: {
            return {
                fetch: typeApi.fetchPositionTypes,
                remove: typeApi.deletePositionType,
                update: typeApi.updatePositionType,
                create: typeApi.createPositionType,
            };
        }
        default: {
            throw new Error(`Type - ${type} was not found`);
        }
    }
};
