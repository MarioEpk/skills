import {fn} from "core/util";

export const TO_TRANSLATE_PREFIX = "TRANSLATE:"; // Will be used to distinguish that this error should be translated

export const required = (value) => (!fn.isNilOrEmpty(value) ? undefined : "Povinn");
