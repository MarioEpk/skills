import {model} from "core/util";

import {Language} from "./Language";
import {Skill} from "./Skill";
import {Technology} from "./Technology";
import {Certificate} from "./Certificate";
import {Other} from "./Other";
import {Project} from "./Project";
import {Type} from "../type";
import {User} from "../user";

export const Cv = model.createModel("Cv", (json) => ({
    id: json.id,
    profile: json.profile,
    avatar: json.avatar,
    createdAt: json.createdAt,
    updatedAt: json.updatedAt,
    languages: Language.fromServerList(json.languages),
    others: Other.fromServerList(json.others),
    projects: Project.fromServerList(json.projects),
    skills: Skill.fromServerList(json.skills),
    certificates: Certificate.fromServerList(json.certificates),
    technologies: Technology.fromServerList(json.technologies),
    positions: Type.fromServerList(json.positions),
    user: User.fromServer(json.user),
    shared: json.shared,
    externalCode: json.externalCode,
}));
