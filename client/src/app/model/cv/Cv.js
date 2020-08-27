import {Map} from "immutable";
import {model} from "core/util";

export const Cv = model.createModel("Cv", (json) => ({
    id: json.id,
    profile: json.profile,
    createdAt: json.createdAt,
    updatedAt: json.updatedAt,
    languages: Map(json.languages),
    others: Map(json.others),
    projects: Map(json.projects),
    skills: Map(json.skills),
    technologies: Map(json.technologies),
    user: Map(json.user),
}));
