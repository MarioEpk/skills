import {model} from "core/util";
import {Type} from "../type";

export const Language = model.createModel("Language", (json) => ({
    id: json.id,
    languageType: Type.fromServer(json.languageType),
    level: json.level,
}));
