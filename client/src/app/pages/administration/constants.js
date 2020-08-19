export const NAME = "administration";

export const availableTypes = {
    LANGUAGE: "LANGUAGE",
    SKILL: "SKILL",
    PROJECT: "PROJECT",
    TECHNOLOGY: "TECHNOLOGY",
};

export const availableTypesArray = Object.values(availableTypes);
export const modalFormName = (type) => `${type}-modal-form`;

export const SEARCH_TABLE_FIELD = "name";
