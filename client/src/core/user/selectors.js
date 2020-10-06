import {createSelector} from 'reselect';

import {app} from "core/util";

import {NAME} from './constants';

const getModel = app.createGetModel(NAME);

export const getUser = (state) => getModel(state);
export const getUserImageUrl = createSelector(
    getUser,
    (user) => (user && user.size > 0 ? user.get("imageUrl") : null),
);
