import {model} from "core/util";

export const Role = model.createModel("Role", (json) => ({
    id: json.id,
    name: json.name,
}));
