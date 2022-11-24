import {model} from "core/util";

export const Education = model.createModel("Skill", (json) => ({
    id: json.id,
    school: json.school,
    field: json.field,
    yearFrom: json.yearFrom,
    yearTo: json.yearTo,
    note: json.note,
}));
