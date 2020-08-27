import {createSelector} from 'reselect';
import {app} from "core/util";
import {NAME} from './constants';

const getModel = app.createGetModel(NAME);

export const userByGoogle = (state) => getModel(state).get("userByGoogle");
export const getUserImageUrl = createSelector(
    userByGoogle,
    (user) => (user.size > 0 ? user.get("imageUrl") : null),
);
