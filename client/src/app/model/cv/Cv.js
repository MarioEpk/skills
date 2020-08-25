import {List, Map} from "immutable";
import {model} from "core/util";
import {Language} from "./Language";

export const Cv = model.createModel("Cv", (json) => ({
    id: json.id,
    profile: json.profile,
    createdAt: json.createdAt,
    updatedAt: json.updatedAt,
    languages: Language.fromServerList(json.languages),
    others: List(json.others),
    projects: List(json.projects),
    skills: List(json.skills),
    technologies: List(json.technologies),
    user: Map(json.user),
}));
