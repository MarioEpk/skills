import {useSelector} from "react-redux";

import {getFormFieldValue} from "core/form";
import access from "core/access";

import {BASE_URL} from "./constants";
import {FORM_NAME, USER_ID_FIELD} from "./form/constants";

export const createMenuItems = (items, onClick, usedIds = []) => items.map(({id, name}) => ({
    title: name,
    onClick: () => onClick(id),
    disabled: usedIds.includes(id),
}));

export const useAccessOrIsOwner = (accesses) => {
    const userId = useSelector((state) => getFormFieldValue(state, FORM_NAME, USER_ID_FIELD));
    return access.useAccess(accesses, userId);
};

export const copyCurrentUrlToClipboard = () => {
    const url = window.location.href;
    return navigator.clipboard.writeText(url);
};

export const copyCVPrivateUrlToClipboard = (id) => {
    const url = `${BASE_URL}/${id}`;
    return navigator.clipboard.writeText(url);
};

export const copyCVPublicUrlToClipboard = (externalCode) => {
    const url = `${BASE_URL}/public/cv/${externalCode}`;
    return navigator.clipboard.writeText(url);
};
