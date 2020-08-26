import {List} from "immutable";
import {model} from "core/util";
import {Project as ProjectType} from "../type";

export const Project = model.createModel("Project", (json) => ({
    id: json.id,
    from: json.date,
    to: json.to,
    company: json.company,
    contribution: json.contribution,
    projectType: ProjectType.fromServer(json.projectType),
    positionTypes: List(json.positionTypes),
}));
