import {model} from "core/util";
import {Locale} from "app/enums";

export const Config = model.createModel("Config", (json) => ({
    locale: Locale[json.locale],
}));
