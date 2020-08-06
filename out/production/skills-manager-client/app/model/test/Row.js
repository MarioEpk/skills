import {model} from "core/util";

export const Row = model.createModel("Row", (json) => ({
    id: json.id,
    name: json.name,
}));
