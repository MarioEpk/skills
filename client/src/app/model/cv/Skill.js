import {model} from "core/util";

import {Type} from "../type";

export const Skill = model.createModel("Skill", (json) => ({
    id: json.id,
    skillType: Type.fromServer(json.skillType),
    level: json.level,
}));
