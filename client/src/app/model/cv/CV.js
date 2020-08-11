import {model} from "core/util";

export const CV = model.createModel("CV", (json) => ({
    id: json.id,
    firstName: json.firstName,
    lastName: json.lastName,
    updatedAt: json.updatedAt,
}));
