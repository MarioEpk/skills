import {model} from "core/util";

export const Project = model.createModel("Type", (json) => ({
    id: json.id,
    name: json.name,
    description: json.description,
}));
