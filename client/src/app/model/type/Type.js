import {model} from "core/util";

export const Type = model.createModel("Type", (json) => ({
    id: json.id,
    name: json.name,
}));
