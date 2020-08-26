import {model} from "core/util";

export const Other = model.createModel("Other", (json) => ({
    id: json.id,
    date: json.date,
    name: json.name,
    description: json.description,
}));
