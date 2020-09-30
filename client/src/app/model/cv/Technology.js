import {model} from "core/util";
import {Type} from "../type";

export const Technology = model.createModel("Technology", (json) => ({
    id: json.id,
    technologyType: Type.fromServer(json.technologyType),
    level: json.level,
}));
