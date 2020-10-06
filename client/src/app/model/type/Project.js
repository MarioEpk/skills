import {model} from "core/util";

import {Type} from "./Type";

export const Project = model.createModel("Type", (json) => ({
    id: json.id,
    name: json.name,
    description: json.description,
    technologies: Type.fromServerList(json.technologies),
    exportName: json.exportName,
}));
