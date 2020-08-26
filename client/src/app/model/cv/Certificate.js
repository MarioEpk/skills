import {model} from "core/util";

export const Certificate = model.createModel("Certificate", (json) => ({
    id: json.id,
    date: json.date,
    name: json.name,
    description: json.description,
}));
