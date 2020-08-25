import {model} from "core/util";
import {Type} from "./Type";
import {Project} from "./Project";

export const AllTypes = model.createModel("AllTypes", (json) => ({
    languages: Type.fromServerList(json.languageTypes),
    projects: Project.fromServerList(json.projectTypes),
    skills: Type.fromServerList(json.skillTypes),
    technologies: Type.fromServerList(json.technologyTypes),
}));
