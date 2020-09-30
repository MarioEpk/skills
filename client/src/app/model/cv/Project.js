import {model} from "core/util";
import {Project as ProjectType, Type} from "../type";

export const Project = model.createModel("Project", (json) => ({
    id: json.id,
    from: json.from,
    to: json.to,
    company: json.company,
    contribution: json.contribution,
    projectType: ProjectType.fromServer(json.projectType),
    positions: Type.fromServerList(json.positions),
    technologies: Type.fromServerList(json.technologies),
}));
